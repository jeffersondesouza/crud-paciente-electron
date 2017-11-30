const PouchDB = require('pouchdb');
const PacienteDB = new PouchDB('pacientes-db')

module.exports = PacienteDB;