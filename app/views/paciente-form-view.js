
const PacienteDAO = require('../paciente/dao/paciente-dao');

const pacienteForm = $('#paciente-form');


PacienteDAO.listarTodos()
  .then(res => {
    const first = res.rows[0];
    console.log(res.rows)
    console.log(first.doc)

    
  })
  .catch(error => {
    console.log(error)

  })


pacienteForm.submit((event) => {

  console.log(pacienteForm.serializeArray());
  const paciente = { _id: new Date().toISOString(), nome: 'joao' };
  /* 
    PacienteDAO.salvarPaciente(paciente)
      .then(res => {
        console.log(res)
  
  
      }).catch(error => {
        console.log(error)
  
      });
   */





  event.preventDefault();

});



function onAddPaciente(event) {


}

const onCancelAddPaciente = () => {
  console.log('cancelado')
}

