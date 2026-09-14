#!/usr/bin/env bash
set -euo pipefail
release="$(pwd -P)"
case "$release" in /var/www/releases/*) ;; *) echo 'Run inside a release directory'; exit 1;; esac
test -f .next/standalone/server.js
PORT=3101 HOSTNAME=127.0.0.1 NODE_ENV=production node .next/standalone/server.js >candidate.log 2>&1 &
candidate=$!
trap 'kill "$candidate" 2>/dev/null || true' EXIT
ready=false
for attempt in {1..20}; do
  if curl --fail --silent --max-time 3 http://127.0.0.1:3101/en-us >/dev/null; then ready=true; break; fi
  sleep 2
done
"$ready" || { echo 'Candidate failed; current site remains running'; exit 1; }
RELEASE_ROOT="$release" node --input-type=module - <<'JS'
import fs from 'node:fs';
const cwd = process.env.RELEASE_ROOT + '/.next/standalone';
const config = { apps: [{ name: 'blackpolar-mainsite', cwd, script: cwd + '/server.js', instances: 1, exec_mode: 'fork', env: { NODE_ENV: 'production', PORT: 3100, HOSTNAME: '127.0.0.1' } }] };
fs.writeFileSync('mainsite.config.cjs', 'module.exports = ' + JSON.stringify(config, null, 2));
JS
sudo -n mkdir -p /etc/blackpolar
had_previous=false
if sudo -n test -f /etc/blackpolar/mainsite.config.cjs; then
  had_previous=true
  sudo -n cp /etc/blackpolar/mainsite.config.cjs "$release/previous.config.cjs"
fi
if sudo -n pm2 describe blackpolar-mainsite >/dev/null 2>&1; then
  sudo -n pm2 delete blackpolar-mainsite
fi
sudo -n pm2 start "$release/mainsite.config.cjs" --update-env
for attempt in {1..20}; do
  if curl --fail --silent --max-time 3 http://127.0.0.1:3100/en-us >/dev/null; then
    sudo -n cp "$release/mainsite.config.cjs" /etc/blackpolar/mainsite.config.cjs
    sudo -n pm2 save
    echo 'Mainsite running on loopback 3100; legacy services preserved'
    exit 0
  fi
  sleep 2
done
if "$had_previous"; then
  sudo -n pm2 delete blackpolar-mainsite >/dev/null 2>&1 || true
  sudo -n pm2 start "$release/previous.config.cjs" --update-env
fi
echo 'Release failed; previous site restored where available'
exit 1
