const $ = require('jquery');
const { ipcRenderer, remote } = require('electron');
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
      $(document).scrollTop(0);
      $('.paciente-form__succes-msg').removeClass('hidden').addClass('visible');
    })
    .catch(error => console.log(error));
}

const resetFormBasedOn = (paciente) => {
  Object.keys(paciente).forEach(key => {
    $(`input[name=${key}]`).val(paciente[key]);
  })
}

const onInit = () => {
  $('body').click((event) => {
    const section = event.target.dataset.section;
    if (section) {
      onTemplateChanges($('#paciente-form'));
    }
  });
}

const onAddPaciente = (pacienteForm) => {
  console.log(pacienteForm)
  pacienteForm.submit((event) => {
    event.preventDefault();
    addPaciente(pacienteForm);
  });
}

const onCancelForm = (pacienteForm) => {
  $('#btn-cancel-form').on('click', () => {
    resetForm(pacienteForm);
  });
}

const onTemplateChanges = (pacienteForm) => {
  onCancelForm(pacienteForm);
  onAddPaciente(pacienteForm);
}




onInit();
onAddPaciente($('#paciente-form'));
onCancelForm($('#paciente-form'))

ipcRenderer.on(IpcEventsEnum.PACIENTE_PARA_EDICAO, (event, paciente) => {
  resetFormBasedOn(paciente);
});