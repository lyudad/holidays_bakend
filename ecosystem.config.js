module.exports = {
  apps: [
    {
      name: 'holidays_backend',
      script: 'dist/main.js',
      watch: ['dist/main.js'],
      env_development: {
        NODE_ENV: 'development',
        PORT: 3030,
        DB_PORT: 3306,
        DB_HOST: 'remotemysql.com',
        DB_USERNAME: 'h9r6G9p9aj',
        DB_PASSWORD: '2uSlyLORAl',
        DB_DATABASE: 'h9r6G9p9aj',
        JWTKEY: 'holiday',
        TOKEN_EXPIRATION: 3600,
        MAIL_PORT: 465,
        MAIL_HOST: 'smtp.meta.ua',
        MAIL_ID: 'zenbit@meta.ua',
        MAIL_PASS: '2412Holidays2021',
      },
    },
    {
      script: 'dist/main.js',
      watch: ['./service-worker'],
    },
  ],
  deploy: {
    production: {
      user: 'zenbit_holidays@meta.ua',
      host: 'SSH_HOSTMACHINE',
      ref: 'origin/master',
      repo: 'https://github.com/lyudad/holidays_bakend/tree/develop',
      path: 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy':
        'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': '',
    },
  },
};
