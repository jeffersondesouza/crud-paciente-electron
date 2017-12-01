const { ipcRenderer } = require('electron');

const IpcEventsEnum = require('../infra/IpcEventsEnum');
const { PacienteController } = require('../paciente');


const listarPacientes = () => {
  PacienteController.listarTodos()
    .then(res => {
      $('#lista-pacientes').html(res.map(template));
    });
}

const onDelete = () => {
  $('#lista-pacientes').on('click', 'button.action-buttons__remove', function (e) {
    e.preventDefault();
    console.log(e.target.id);
    PacienteController.remover(e.target.id)
      .then(res => {
        listarPacientes();
      })
  });
}

const onEdit = () => {
  $('#lista-pacientes').on('click', 'button.action-buttons__edit', function (e) {
    e.preventDefault();
    console.log(e.target.id);
    ipcRenderer.send(IpcEventsEnum.PACIENTE_PARA_EDICAO, e.target.id)

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
            <button id="${model.id}" class="action-buttons__edit">Edit</button>
            <button id="${model.id}" class="action-buttons__remove">Remove</button>
          </div>
        </div>
      </li>
  `
    : '<li></li>';
}

$(document).ready(() => {
  listarPacientes();
  onDelete();
  onEdit();
});