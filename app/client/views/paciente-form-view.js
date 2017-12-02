const { ipcRenderer } = require('electron');
const IpcEventsEnum = require('../../server/infra/IpcEventsEnum');

const { PacienteController } = require('../../server/paciente');

const pacienteForm = $('#paciente-form');

console.log(pacienteForm)

const onAddPaciente = () => {
  pacienteForm.submit((event) => {

    PacienteController.salvar(pacienteForm.serializeArray())
      .then(res => {
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

MAX = 100;