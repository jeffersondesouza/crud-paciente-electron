const PouchDB = require('pouchdb');
const PacienteDB = new PouchDB('pacientes')

module.exports = PacienteDB;