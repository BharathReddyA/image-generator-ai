const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://api.openai.com',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '', // remove '/api' from the beginning of the URL
      },
    })
  );
};