const productName = '机构惠'
module.exports = {
  publicPath: './',
  productionSourceMap: false,
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = productName
        return args
      })
  },
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      customFileProtocol: 'lead://./',
      builderOptions: {
        appId: 'com.lead.app',
        productName,
        copyright: 'Copyright©2017leadbank.com',
        publish: [
          {
            provider: 'generic',
            url: 'http://localhost:9999/'
          }

        ],
        extraMetadata: {
          mian: './build/app.js'
        },
        directories: {
          buildResources: 'assets'
        },
        mac: {
          target: [
            'dmg'
          ],
          category: 'public.app-category.finance'
        },
        dmg: {
          icon: 'assets/icons/icon.icns',
          iconSize: 100
        },
        win: {
          target: [
            'nsis'
          ],
          icon: 'assets/icons/icon.ico'
        },
        nsis: {
          allowToChangeInstallationDirectory: true,
          oneClick: false,
          perMachine: false
        },
        linux: {
          target: [
            'AppImage'
          ],
          category: 'Finance'
        }
      }
    }
  }
}
