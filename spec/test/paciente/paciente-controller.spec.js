const assert = require('assert')
const { PacienteController } = require('../../../app/paciente');
const { parseSerializedData } = require('../../../app/helpers')

const serializedData = [
  {
    name: 'nome',
    value: 'joao'
  },
  {
    name: 'endereco',
    value: 'rua 2'
  }
];

it('should get serialised data and return data to send do controller', () => {
  const informedData = parseSerializedData(serializedData);

  expect(informedData.nome).toBe('joao');
  expect(informedData.endereco).toBe('rua 2');

});




