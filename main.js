
const { app, BrowserWindow, ipcMain } = require('electron');
const IpcEventsEnum = require('./app/server/infra/IpcEventsEnum');

let mainWindow;

const createWindow = () => {

  var shouldQuit = makeSingleInstance()
  if (shouldQuit) return app.quit()


  mainWindow = new BrowserWindow({
    width: 1080,
    minWidth: 680,
    height: 840,
    icon: `${__dirname}/assets/img/icon.png`
  });
  mainWindow.loadURL(`file://${__dirname}/index.html`);
}

function makeSingleInstance() {
  if (process.mas) return false

  return app.makeSingleInstance(function () {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore()
      mainWindow.focus()
    }
  })
}


/*   width: 1250,
height: 700, */


app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', function () {
  if (win === null) {
    createWindow()
  }
});

ipcMain.on(IpcEventsEnum.PACIENTE_PARA_EDICAO_ID, (event, paciente) => {
  console.log(paciente)
  event.sender.send(IpcEventsEnum.PACIENTE_PARA_EDICAO, paciente);
});



