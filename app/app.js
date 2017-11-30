const pacienteModule = require('./paciente');
const PouchDB = require('pouchdb');

const db = new PouchDB('pessoas')

console.log(pacienteModule)

const pacientes = [
  {
    nome: 'joao',
    telefone: '88888888',
    email: 'joso@email.com',
    data_de_nascimento: '12/12/1970',
    endereço: 'rua nova',
  },

  {
    nome: 'joao',
    telefone: '88888888',
    email: 'joso@email.com',
    data_de_nascimento: '12/12/1970',
    endereço: 'rua nova'
  },
  {
    nome: 'joao',
    telefone: '88888888',
    email: 'joso@email.com',
    data_de_nascimento: '12/12/1970',
    endereço: 'rua nova'
  }
]


console.log(process.versions.node)


const listaPacientesView = `${pacientes.map(paciente => `<li> ${paciente.nome} </li>`).join('')}`;

$('#lista-pacientes').append(listaPacientesView);

$('#btn-salvar').click((e) => {
  e.preventDefault();
  pacienteModule.salvarPaciente(pacientes[0])
});