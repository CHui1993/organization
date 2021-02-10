import { dialog } from 'electron'
import { autoUpdater } from 'electron-updater'
const appUpdater = () => {
  if (process.env.NODE_ENV !== 'production') {
    autoUpdater.updateConfigPath = './dev-app-updater.yml'
    autoUpdater.checkForUpdates()
  } else {
    autoUpdater.checkForUpdatesAndNotify()
  }
  autoUpdater.autoDownload = false
  autoUpdater.on('error', (error) => {
    dialog.showErrorBox('Error: ', error == null ? 'unknow' : error.standard)
  })
  autoUpdater.on('update-available', () => {
    console.log(123123)
    dialog.showMessageBox({
      type: 'info',
      title: '应用有新的版本',
      message: '发现新的版本,是否现在更新？',
      button: ['否', '是']
    }, (buttonIndex) => {
      if (buttonIndex === 1) {
        autoUpdater.downloadUpdate()
      }
    })
  })

  autoUpdater.on('update-not-available', () => {
    console.log(1231231321231231231231231)

    dialog.showMessageBox({
      title: '没有新的版本',
      message: '当前已是最新版本'
    })
  })
}

export default appUpdater
