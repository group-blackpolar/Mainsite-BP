#!/usr/bin/env bash
set -euo pipefail
release="$(pwd -P)"
case "$release" in /var/www/releases/*) ;; *) echo 'Run inside a release directory'; exit 1;; esac
test -f .next/standalone/server.js
# RM-003: the site runs as the unprivileged system user below, never as root. The release stays read-only for it
# except the two paths Next writes at runtime (prerendered pages and the image cache), prepared further down.
run_user=bp-mainsite
pm2_app() { sudo -n -H -u "$run_user" pm2 "$@"; }
PORT=3101 HOSTNAME=127.0.0.1 NODE_ENV=production node .next/standalone/server.js >candidate.log 2>&1 &
candidate=$!
trap 'kill "$candidate" 2>/dev/null || true' EXIT
ready=false
for attempt in {1..20}; do
  if curl --fail --silent --max-time 3 http://127.0.0.1:3101/en-us >/dev/null; then ready=true; break; fi
  sleep 2
done
"$ready" || { echo 'Candidate failed; current site remains running'; exit 1; }
# The candidate ran as the deploy user and may have written into the release: stop it before opening the writable paths.
kill "$candidate" 2>/dev/null || true
wait "$candidate" 2>/dev/null || true
standalone="$release/.next/standalone"
mkdir -p "$standalone/.next/cache"
writable=("$standalone/.next/server/app" "$standalone/.next/cache")
chgrp -R "$run_user" "${writable[@]}"
chmod -R g+rwX "${writable[@]}"
find "${writable[@]}" -type d -exec chmod g+s {} +
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
# Legacy: before RM-003 the app lived in root's PM2. Remove it once so it cannot be resurrected at boot or hold port 3100.
if sudo -n pm2 describe blackpolar-mainsite >/dev/null 2>&1; then
  sudo -n pm2 delete blackpolar-mainsite
  sudo -n pm2 save --force
fi
if pm2_app describe blackpolar-mainsite >/dev/null 2>&1; then
  pm2_app delete blackpolar-mainsite
fi
pm2_app start "$release/mainsite.config.cjs" --update-env
for attempt in {1..20}; do
  if curl --fail --silent --max-time 3 http://127.0.0.1:3100/en-us >/dev/null; then
    sudo -n cp "$release/mainsite.config.cjs" /etc/blackpolar/mainsite.config.cjs
    pm2_app save
    echo 'Mainsite running on loopback 3100 as '"$run_user"'; legacy services preserved'
    exit 0
  fi
  sleep 2
done
if "$had_previous"; then
  pm2_app delete blackpolar-mainsite >/dev/null 2>&1 || true
  pm2_app start "$release/previous.config.cjs" --update-env
fi
echo 'Release failed; previous site restored where available (now under '"$run_user"')'
exit 1
