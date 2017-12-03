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


const removePacienteLocalmente = (pacienteId) => {
  listaDePacientes = listaDePacientes.filter(paciente => paciente._id !== pacienteId)
  $('#lista-pacientes').html(listaDePacientes.map(template));
}

const removePaciente = (pacienteId) => {
  PacienteController.remover(pacienteId)
    .then(res => {
      removePacienteLocalmente(pacienteId);
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

    if (listaPacientesFiltrada.length) {
      $('#lista-pacientes').html(listaPacientesFiltrada.map(template));
    } else {
      $('#lista-pacientes').html(`Não econtramos nenhum Paciente com o nome <strong>${nomeFiltro}</strong>`);
    }

  });
}

const template = (model) => {
  return model
    ? `
      <li id="list" class="paciente-item">
        <div class="paciente-item__paciente-info">
          <div class="paciente-item__paciente-info__nome gray-dark">
            ${model.nome}
          </div>
          <div class="paciente-item__paciente-info__email light-blue">
            ${model.email}
          </div>
          <div class="paciente-item__paciente-info__telefone gray-light">
            ${model.telefone}
          </div>
        </div>
        <div class="paciente-item__action">
        <button id="${model.id}"  data-section="link-form-pacientes" class="action-buttons action-buttons__edit btn btn-secundary" title="Clique para editar paciente">
          Editar
        </button>
        <button id="${model.id}" class="action-buttons action-buttons__remove btn btn-danger" title="Clique para Remover paciente">
          Remover
        </button>
     
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
