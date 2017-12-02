const { ipcRenderer } = require('electron');

const IpcEventsEnum = require('../../../app/server/infra/IpcEventsEnum');
const { PacienteController } = require('../../server/paciente');
/** end imports */

const listarPacientes = () => {
  PacienteController.listarTodos()
    .then(res => {
      $('#lista-pacientes').html(res.map(template));
      onEditListening();
      onDeleteListening();
    });
}


const checarExistenciaPaciente = (pacienteId) => {
  return PacienteController.buscarPorId(pacienteId);
}

const onDeleteListening = () => {
  $('#lista-pacientes').on('click', 'button.action-buttons__remove', function (e) {
    e.preventDefault();

    checarExistenciaPaciente(e.target.id)
      .then(paciente => {
        const isDeleteConfirmed = confirm(`Você tem certeza que deseja deletar o pacieente: ${paciente.nome}`)
        if (isDeleteConfirmed) {
          PacienteController.remover(e.target.id)
            .then(res => {
              listarPacientes();
            });
        }
      })
      .catch(error => console.log('Houve um Erro, ou o Paciente não existe'))
  });
}

const onEditListening = () => {
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
  onEditListening();
});
