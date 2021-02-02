const path = require('path')
const webpack = require('webpack')

// vue.config.js
const vueConfig = {
  publicPath: './',
  outputDir: 'dist',
  configureWebpack: {
    plugins: [
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new webpack.DefinePlugin({
        VUE_APP_ENV: `"${process.env.VUE_APP_ENV}"`,
        VUE_APP_MOCK: `"${process.env.VUE_APP_MOCK}"`
      })
    ]
  },

  chainWebpack: config => {
    config.resolve.alias.set('@$', path.join(__dirname, 'src'))
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .oneOf('inline')
      .resourceQuery(/inline/)
      .use('vue-svg-icon-loader')
      .loader('vue-svg-icon-loader')
      .end()
      .end()
      .oneOf('external')
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: 'assets/[name].[hash:8].[ext]'
      })
  },

  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          'border-radius-base': '4px'
        },
        javascriptEnabled: true
      }
    }
  },

  devServer: {
    port: 8000,
    contentBase: [path.resolve(process.cwd(), 'dist'), path.resolve(process.cwd(), 'mocks')]
  },

  productionSourceMap: false,
  lintOnSave: false,
  transpileDependencies: []
}

module.exports = vueConfig
