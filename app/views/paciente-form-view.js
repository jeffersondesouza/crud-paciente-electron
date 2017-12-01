
const PacienteDAO = require('../paciente/dao/paciente-dao');
const pacienteForm = $('#paciente-form');

const onAddPaciente = () => {
  pacienteForm.submit((event) => {
    console.log(pacienteForm.serializeArray());
    const paciente = { _id: new Date().toISOString(), nome: 'joao' };
    event.preventDefault();
  });
}

const onCancelAddPaciente = () => {
  console.log('cancelado')
}

onAddPaciente();

