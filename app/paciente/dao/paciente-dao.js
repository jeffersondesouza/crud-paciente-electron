const PacienteDB = require('../database/paciente-db');

const salvarPaciente = (paciente) => {
  return PacienteDB.put(paciente);
}

module.exports = { salvarPaciente };