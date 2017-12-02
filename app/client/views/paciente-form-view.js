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
    })
    .catch(error => console.log(error));
}

const onAddPaciente = (pacienteForm) => {
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

$('body').click((event) => {
  const section = event.target.dataset.section;
  if (section) {
    onTemplateChanges($('#paciente-form'));
  }
});

onAddPaciente($('#paciente-form'));
onCancelForm($('#paciente-form'))

ipcRenderer.on(IpcEventsEnum.PACIENTE_PARA_EDICAO, (event, paciente) => {

  console.log('form: ', paciente);
  
  
  $('input[name=nome]').val(paciente.nome);
  $('input[name=email]').val(paciente.email);
  $('input[name=telefone]').val(paciente.telefone);
  $('input[name=dataDeNascimento]').val(paciente.dataDeNascimento);
  $('input[name=endereco]').val(paciente.endereco);
  $('input[name=_id]').val(paciente._id);
  $('input[name=_rev]').val(paciente._rev);


});