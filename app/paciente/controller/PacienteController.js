
const PacienteDAO = require('../dao/paciente-dao');
const paciente = require('../model/paciente');

const { SerializedInputParser } = require('../../helpers')
/*  */

const getParsedData = (inputData) => {
  return SerializedInputParser.parse(inputData);
}

const getRowArrayData = (list) => {
  return list.map(listItem => Object.assign(listItem.doc, { id: listItem.doc._id }))
}


const salvar = (inputData) => {
  paciente.init(getParsedData(inputData));
  return PacienteDAO.salvar(paciente);
}

const listarTodos = () => {
  return PacienteDAO.listarTodos()
    .then(res => {
      return new Promise((resolve, reject) => {
        resolve(getRowArrayData(res.rows));
      });
    });
}

module.exports = { salvar, listarTodos }