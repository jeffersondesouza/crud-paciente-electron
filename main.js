const { app, BrowserWindow } = require('electron');

let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 600,
    height: 600,
    icon: `${__dirname}/assets/img/icon.png`
  });
  mainWindow.loadURL(`file://${__dirname}/app/pages/index.html`);
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


