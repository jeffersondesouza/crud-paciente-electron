
const { PacienteController } = require('../paciente');

const pacienteForm = $('#paciente-form');

const onAddPaciente = () => {
  pacienteForm.submit((event) => {
    event.preventDefault();
    PacienteController.salvar(pacienteForm.serializeArray())
      .then(res => {
        console.log(res);
        pacienteForm.each(function () {
          this.reset();
        });
      })
      .catch(error => console.log(error));

  });
}

const onCancelAddPaciente = () => {
  console.log('cancelado')
}

onAddPaciente();

