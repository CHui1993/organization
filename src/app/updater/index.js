import { ipcMain } from 'electron'
import { autoUpdater } from 'electron-updater'
const devUrl = 'http://localhost:9999/'

export const appUpdater = (mainRender) => {
  autoUpdater.setFeedURL(devUrl)
  autoUpdater.autoDownload = false
  autoUpdater.on('error', (error) => {
    mainRender.webContents.send('error', error)
  })
  autoUpdater.on('update-available', (config) => {
    mainRender.webContents.send('update-available', config)
  })

  autoUpdater.on('update-not-available', (config) => {
    mainRender.webContents.send('update-not-available', config)
  })

  autoUpdater.on('download-progress', function (progressObj) {
    mainRender.webContents.send('downloadProgress', progressObj)
  })
  ipcMain.on('startUpdate', () => {
    autoUpdater.downloadUpdate().then(res => {
      mainRender.webContents.send('error', '开始下载')
    }).catch(error => {
      console.log('error', error)
    })
  })

  autoUpdater.on('update-downloaded', () => {
    mainRender.webContents.send('error', '下载完成')
    ipcMain.on('quitAndInstall', () => {
      autoUpdater.quitAndInstall()
    })
    mainRender.webContents.send('updateDownloaded')
  })
}

export const checkUpdate = () => {
  if (process.env.NODE_ENV !== 'production') {
    autoUpdater.checkForUpdates()
  } else {
    autoUpdater.checkForUpdatesAndNotify()
  }
}
