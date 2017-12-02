const { ipcRenderer } = require('electron');
const IpcEventsEnum = require('../../server/infra/IpcEventsEnum');

const { PacienteController } = require('../../server/paciente');


const resetForm = (pacienteForm) => {
  pacienteForm.each(function () {
    this.reset();
  });
}

const addPaciente = (pacienteForm) => {
  PacienteController.salvar(pacienteForm.serializeArray())
    .then(res => {
      resetForm(pacienteForm);
    })
    .catch(error => console.log(error));
}

const onAddPaciente = () => {

  let pacienteForm = $('#paciente-form');

  pacienteForm.submit((event) => {
    event.preventDefault();
    addPaciente(pacienteForm);
  });
}

const onCancelAddPaciente = () => {
  console.log('cancelado')
}

const onCancelForm = () => {
  /* let pacienteForm = $('#paciente-form');

  btn - cancel - form */
}


const onTemplateChanges = () => {

  onCancelForm();
  onAddPaciente();
}

ipcRenderer.on(IpcEventsEnum.TEMPLATE_LOADED, () => {
  console.log(IpcEventsEnum.TEMPLATE_LOADED)
})


ipcRenderer.on(IpcEventsEnum.PACIENTE_PARA_EDICAO, (e, value) => {
  console.log(e, value)
})

$('body').click((event) => {
  const section = event.target.dataset.section;
  if (section) {

    onTemplateChanges($('#paciente-form'));

  }
});

onAddPaciente();
onCancelForm();