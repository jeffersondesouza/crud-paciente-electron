const { PacienteController } = require('../paciente');
onInit();

function onInit() {
  PacienteController.listarTodos()
    .then(res => {
      $('#lista-pacientes').append(res.map(template));
    })
}

const template = (model) => {
  return model ? `
      <li class="paciente-item>
        <div class="paciente-item__nome>
          ${model.nome}
        </div>
        <div class="paciente-item__email>
          ${model.email}
        </div>
        <div class="paciente-item__telefone>
          ${model.telefone}
        </div>
        <div class="action-buttons">
          <div class="action-buttons">
            <button class="action-buttons__edit">Edit</button>
            <button class="action-buttons__remove">Remove</button>            
          </div>
        </div>
      </li>
  ` : '<li></li>';
}



