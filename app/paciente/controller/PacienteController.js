const PacienteDAO = require('../dao/paciente-dao');
const paciente = require('../model/paciente');

const { SerializedInputParser } = require('../../helpers')
/*  */

const getParsedData = (inputData) => {
  return SerializedInputParser.parse(inputData);
}

const salvar = (inputData) => {
  paciente.init(getParsedData(inputData));
  return PacienteDAO.salvar(paciente);
}

const listarTodos = () => {
  return PacienteDAO.listarTodos();
}

module.exports = { salvar, listarTodos }