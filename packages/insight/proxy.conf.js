let config;
try {
  config = require('./proxy.conf.override');
} catch (err) {
  config = {
    '/api': {
      target: {
        host: 'api.litecoinz.org',
        protocol: 'https:',
        port: 443
      },
      secure: false,
      changeOrigin: true,
      logLevel: 'debug'
    }
  };
}

module.exports = config;
