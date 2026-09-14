module.exports = {
  apps: [
    {
      name: "blackpolar-web",
      script: ".next/standalone/server.js",
      env: { NODE_ENV: "production", HOSTNAME: "127.0.0.1", PORT: "3000" },
    },
  ],
};
