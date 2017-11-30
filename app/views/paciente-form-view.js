
const pacienteForm = $('#paciente-form');



pacienteForm.submit((event) => {

  console.log(pacienteForm.serializeArray());
  event.preventDefault();
});
function onAddPaciente(event) {


}

const onCancelAddPaciente = () => {
  console.log('cancelado')

}