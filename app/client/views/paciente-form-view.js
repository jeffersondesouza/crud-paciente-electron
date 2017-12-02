const { ipcRenderer } = require('electron');
const IpcEventsEnum = require('../../server/infra/IpcEventsEnum');

const { PacienteController } = require('../../server/paciente');


const onAddPaciente = () => {
  console.log('on add')
  let pacienteForm = $('#paciente-form');
  pacienteForm.submit((event) => {
    event.preventDefault();

    console.log(pacienteForm);
    console.log(event);

    PacienteController.salvar(pacienteForm.serializeArray())
      .then(res => {
        pacienteForm.each(function () {
          this.reset();
        });
      })
      .catch(error => console.log(error));
  });
}

const onCancelAddPaciente = () => {
  console.log('cancelado')
}



$('body').click((event) => {
  const section = event.target.dataset.section;
  if (section) {
    onAddPaciente();
  }
});

ipcRenderer.on(IpcEventsEnum.TEMPLATE_LOADED, () => {
  console.log(IpcEventsEnum.TEMPLATE_LOADED)
})


ipcRenderer.on(IpcEventsEnum.PACIENTE_PARA_EDICAO, (e, value) => {
  console.log(e, value)
})

onAddPaciente();