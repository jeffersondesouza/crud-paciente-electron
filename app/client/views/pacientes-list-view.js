const { ipcRenderer } = require('electron');

const IpcEventsEnum = require('../../../app/server/infra/IpcEventsEnum');
const { PacienteController } = require('../../server/paciente');
/** end imports */

let listaDePacientes = [];

const listarPacientes = () => {
  PacienteController.listarTodos()
    .then(res => {
      listaDePacientes = res;
      onEditListening();
      onDeleteListening();
      onPesquisaPaciente();
    });
}


const checaExistenciaPaciente = (pacienteId) => {
  return PacienteController.buscarPorId(pacienteId);
}

const removePaciente = (pacienteId) => {
  PacienteController.remover(pacienteId)
    .then(res => {
      listarPacientes();
    });

}

const onDeleteListening = () => {
  $('#lista-pacientes').on('click', 'button.action-buttons__remove', function (e) {
    e.preventDefault();

    checaExistenciaPaciente(e.target.id)
      .then(paciente => {
        const isDeleteConfirmed = confirm(`Você tem certeza que deseja deletar o pacieente: ${paciente.nome}`)
        if (isDeleteConfirmed) {
          removePaciente(e.target.id);
        }
      })
      .catch(error => console.log('Houve um Erro, ou o Paciente não existe'))
  });
}

const onEditListening = () => {
  $('#lista-pacientes').on('click', 'button.action-buttons__edit', function (e) {
    e.preventDefault();

    checaExistenciaPaciente(e.target.id)
      .then(paciente => {
        ipcRenderer.send(IpcEventsEnum.PACIENTE_PARA_EDICAO_ID, paciente)
      })
      .catch(error => console.log('Houve um Erro, ou o Paciente não existe'));
  });
}

const onPesquisaPaciente = () => {
  $('#lista-pacientes').html(listaDePacientes.map(template));
  $('#pesquisa-pacientes').on('input', (e) => {
    const nomeFiltro = e.target.value.toLowerCase();
    const listaPacientesFiltrada = listaDePacientes
      .filter(paciente => paciente.nome.toLowerCase().includes(nomeFiltro));
    $('#lista-pacientes').html(listaPacientesFiltrada.map(template));
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
