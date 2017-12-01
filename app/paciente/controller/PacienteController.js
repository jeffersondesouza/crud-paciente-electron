
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
  const pacienteToSave = getParsedData(inputData);
  pacienteToSave._id = new Date().toISOString(),

    console.log(pacienteToSave)

  return PacienteDAO.salvar(pacienteToSave);
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