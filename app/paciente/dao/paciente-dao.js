const PacienteDB = require('../database/paciente-db');

const salvarPaciente = (paciente) => {
  PacienteDB.put({
    _id: 'mydoc',
    title: 'Heroes'
  }).then(res => console.log(res));
}

module.exports = { salvarPaciente };