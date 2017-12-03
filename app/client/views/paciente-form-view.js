const $ = require('jquery');
const { ipcRenderer, remote } = require('electron');
const IpcEventsEnum = require('../../server/infra/IpcEventsEnum');

const { SerializedInputParser, FormValidator } = require('../../helpers')

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
      $('.paciente-form__succes-msg')
        .removeClass('hidden')
        .removeClass('danger-alert')
        .addClass('visible')
        .addClass('succes-alert')
        .text('Paciente Adicioando com Sucesso!')
    })
    .catch(error => console.log(error));
}

const resetFormBasedOn = (paciente) => {
  Object.keys(paciente).forEach(key => {
    $(`input[name=${key}]`).val(paciente[key]);
  })
}

const setErrorMessages = (requiredFields) => {

  requiredFields.forEach(fieldName => {
    if (!$(`input[name=${fieldName}]`).val()) {
      $(`input[name=${fieldName}]`).addClass('danger-input');
      $(`#${fieldName}-error`).removeClass('hidden');
    } else {
      $(`#${fieldName}-error`).addClass('hidden');
      $(`input[name=${fieldName}]`).removeClass('danger-input');
    }
  });
};

const removeErrorMessages = (requiredFields) => {
  requiredFields.forEach(fieldName => {
    $(`#${fieldName}-error`).addClass('hidden');
    $(`input[name=${fieldName}]`).removeClass('danger-input');
  });
};

const onInit = () => {
  $('body').click((event) => {
    const section = event.target.dataset.section;
    if (section) {
      onTemplateChanges($('#paciente-form'));
    }
  });
}

const onAddPaciente = (pacienteForm) => {
  pacienteForm.submit((event) => {
    event.preventDefault();

    const requiredFields = ['nome', 'dataDeNascimento', 'email', 'telefone'];
    const isFormValid = FormValidator.validate(pacienteForm, requiredFields);

    if (isFormValid) {
      removeErrorMessages(requiredFields);
      addPaciente(pacienteForm);
    } else {
      $(document).scrollTop(0);
      $('.paciente-form__succes-msg')
        .removeClass('hidden')
        .addClass('visible')
        .addClass('danger-alert')
        .text('Desculpe, Informe todo os Campos obrigatórios marcados com *');

      setErrorMessages(requiredFields);
    }


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