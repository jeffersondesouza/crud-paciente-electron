const PacienteDB = require('../../infra/PacienteDB');


const salvar = (paciente) => {
  return PacienteDB.put({
    _id: 'mydoc',
    title: "Let's Dance"
  });
}

const remover = (paciente) => {
  return PacienteDB.remove(paciente);
}

const listarTodos = () => {
  return PacienteDB.allDocs({ include_docs: true, descending: true });
}
const buscarPorId = (docId) => {
  return PacienteDB.get(docId);
}

module.exports = { salvar, remover, listarTodos, buscarPorId };