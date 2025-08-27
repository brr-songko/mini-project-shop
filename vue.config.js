const { defineConfig } = require('@vue/cli-service')

const target = 'http://127.0.0.1:8080';

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8090,
    proxy: {
      '^/api': {
        target,
        changeOrigin: true,
      },
      '^/upload': {
        target,
        changeOrigin: true,
      },
      '^/download': {
        target,
        changeOrigin: true,
      }
    }
  }
})
