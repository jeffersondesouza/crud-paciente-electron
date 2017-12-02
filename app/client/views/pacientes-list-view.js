const { ipcRenderer } = require('electron');

const IpcEventsEnum = require('../../../app/server/infra/IpcEventsEnum');
const { PacienteController } = require('../../server/paciente');
/** end imports */

const listarPacientes = () => {
  PacienteController.listarTodos()
    .then(res => {
      $('#lista-pacientes').html(res.map(template));
      onEdit();
      onDelete();
    });
}

const onDelete = () => {
  $('#lista-pacientes').on('click', 'button.action-buttons__remove', function (e) {
    e.preventDefault();
    console.log(e.target.id);

    PacienteController.buscarPorId(e.target.id)
      .then(paciente => {
        ipcRenderer.send(IpcEventsEnum.REMOCAO_PACIENTE, paciente);
      })
      .catch(error => console.log('Houve um Erro, ou o Paciente não existe'))


    /*    PacienteController.remover(e.target.id)
         .then(res => {
           listarPacientes();
         })
         .catch(error => console.log(error)); */
  });
}

const onEdit = () => {
  $('#lista-pacientes').on('click', 'button.action-buttons__edit', function (e) {
    e.preventDefault();
    PacienteController.buscarPorId(e.target.id)
      .then(paciente => {
        ipcRenderer.send(IpcEventsEnum.PACIENTE_PARA_EDICAO_ID, paciente)
      })
  });
}

const template = (model) => {
  // console.log(model)
  return model
    ? `
      <li id="list" class="paciente-item">
        <div class="paciente-item__nome">
          ${model.nome}
        </div>
        <div class="paciente-item__email">
          ${model.email}
        </div>
        <div class="paciente-item__telefone">
          ${model.telefone}
        </div>
        <div class="action-buttons">
          <div class="action-buttons">
            <button id="${model.id}"  data-section="link-form-pacientes" class="action-buttons__edit">Edit</button>
            <button id="${model.id}" class="action-buttons__remove">Remove</button>
          </div>
        </div>
      </li>
  `
    : '<li></li>';
}

$(document).ready(function () {
  $('body').click((event) => {
    const section = event.target.dataset.section;
    if (section === 'link-lista-pacientes') {
      listarPacientes();
    }
  });

  listarPacientes();
  onEdit();
});



ipcRenderer.on('paciente-remove', (event, paciente) => {
  console.log('paciente: ', paciente)
});