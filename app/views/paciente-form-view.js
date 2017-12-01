
const { PacienteController } = require('../paciente');

const pacienteForm = $('#paciente-form');

const onAddPaciente = () => {
  pacienteForm.submit((event) => {

    PacienteController.salvar(pacienteForm.serializeArray())
      .then(res => {
        console.log(res);
        pacienteForm.each(function () {
          this.reset();
        });
      })
      .catch(error => console.log(error));

    event.preventDefault();
  });
}

const onCancelAddPaciente = () => {
  console.log('cancelado')
}

onAddPaciente();

