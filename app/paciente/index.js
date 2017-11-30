const pacienteController = require('./dao/paciente-dao');

module.exports = {
  nome: 'ola',
  salvarPaciente: pacienteController.salvarPaciente
}