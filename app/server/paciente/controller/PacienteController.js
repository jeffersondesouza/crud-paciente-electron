
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
  console.log(inputData)
  
  const pacienteToSave = getParsedData(inputData);
  
  console.log(pacienteToSave)
  if (!pacienteToSave._id) {
    pacienteToSave._id = new Date().toISOString();
  }
  



  return PacienteDAO.salvar(pacienteToSave);
}

const remover = (id) => {
  return PacienteDAO.buscarPorId(id)
    .then(res => {
      return PacienteDAO.remover(res);
    });
}

const listarTodos = () => {
  return PacienteDAO.listarTodos()
    .then(res => {
      return new Promise((resolve, reject) => {
        resolve(getRowArrayData(res.rows));
      });
    });
}

const buscarPorId = (docId) => {
  return PacienteDAO.buscarPorId(docId);
}



module.exports = { salvar, listarTodos, remover, buscarPorId }