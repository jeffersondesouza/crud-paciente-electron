
const { app, BrowserWindow, ipcMain } = require('electron');
const IpcEventsEnum = require('./app/server/infra/IpcEventsEnum');

let mainWindow;
let deletarPacienteWindow = null;


const createWindow = () => {

  var shouldQuit = makeSingleInstance()
  if (shouldQuit) return app.quit()


  mainWindow = new BrowserWindow({
    width: 1080,
    minWidth: 680,
    height: 840,
    title:'Diagnes',
    icon: `${__dirname}/assets/img/logo-icon.svg`
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



ipcMain.on(IpcEventsEnum.REMOCAO_PACIENTE, (event, paciente) => {
  console.log(paciente)
  if (!deletarPacienteWindow) {

    deletarPacienteWindow = new BrowserWindow({
      width: 300,
      height: 220,
      alwaysOnTop: true,
      parent: mainWindow
    });

    deletarPacienteWindow.on('close', () => {
      deletarPacienteWindow = null;
    });


    deletarPacienteWindow.send('paciente-remove', paciente);

  }
  deletarPacienteWindow.loadURL(`file://${__dirname}/app/client/templates/confirm-deletar-paciente.html`);

  event.sender.send(IpcEventsEnum.PACIENTE_PARA_EDICAO, paciente);
});
