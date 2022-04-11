const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/api',
      {
        target: "https://api.uomg.com",
        changeOrigin: true,
        pathRewrite: {
          '^/api':'/api'
        }
      }
    )
  )
}