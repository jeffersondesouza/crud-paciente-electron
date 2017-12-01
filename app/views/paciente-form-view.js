const PacienteDAO = require('../paciente/dao/paciente-dao');

const pacienteForm = $('#paciente-form');



pacienteForm.submit((event) => {

  console.log(pacienteForm.serializeArray());
  const paciente = { _id: new Date().toISOString(), nome: 'joao' };

  PacienteDAO.salvarPaciente(paciente)
    .then(res => {
      console.log(res)

      PacienteDAO.removePaciente(paciente)
        .then(res => {
          console.log(res)
        }).catch(error => {
          console.log(error)

        })

    }).catch(error => {
      console.log(error)

    });




  event.preventDefault();

});
function onAddPaciente(event) {


}

const onCancelAddPaciente = () => {
  console.log('cancelado')

}

console.log('d')