// vue.config.js for less-loader@6.0.0
const path = require('path');

module.exports = {
    devServer: {
      proxy: {
          '/api': {
              target: 'http://localhost:3000/',
              changeOrigin: true,
              ws: true,
              pathRewrite: {
                  '/api': ''
              }
          }
      }
    },
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'less',
            patterns: [
              path.resolve(__dirname, './src/variables.less'),
            ],
        },
    },
    css: {
        loaderOptions: {
            less: {
                lessOptions: {
                    modifyVars: {
                        'primary-color': '#92b6d5',
                        'link-color': '#92b6d5',
                        'border-radius-base': '2px',
                    },
                    javascriptEnabled: true,
                },
            },
        },
    },
    runtimeCompiler: true,
};