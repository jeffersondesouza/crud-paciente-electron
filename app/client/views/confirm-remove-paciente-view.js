const { ipcRenderer, remote } = require('electron');
const IpcEventsEnum = require('../../server/infra/IpcEventsEnum');


ipcRenderer.on('paciente-remove', (event, paciente) => {
  console.log(paciente)
  alert('ok')
});