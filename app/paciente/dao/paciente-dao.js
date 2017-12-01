const PacienteDB = require('../../infra/PacienteDB');

const salvarPaciente = (paciente) => {
  return PacienteDB.put(paciente);
}

const removePaciente = (paciente) => {
  return PacienteDB.remove(paciente);

}

module.exports = { salvarPaciente, removePaciente };