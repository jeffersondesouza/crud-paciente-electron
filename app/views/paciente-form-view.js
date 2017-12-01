const { ipcRenderer } = require('electron');
const IpcEventsEnum = require('../infra/IpcEventsEnum');

const { PacienteController } = require('../paciente');

const pacienteForm = $('#paciente-form');

const onAddPaciente = () => {
  pacienteForm.submit((event) => {

    PacienteController.salvar(pacienteForm.serializeArray())
      .then(res => {
        console.log(res);
        pacienteForm.each(function () {
          this.reset();
        });
      })
      .catch(error => console.log(error));

    event.preventDefault();
  });
}

const onCancelAddPaciente = () => {
  console.log('cancelado')
}

onAddPaciente();

ipcRenderer.on(IpcEventsEnum.PACIENTE_PARA_EDICAO, (e, value) => {
  console.log(e, value)
})