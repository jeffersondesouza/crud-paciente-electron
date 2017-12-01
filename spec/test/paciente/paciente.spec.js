const assert = require('assert')
const paciente = require('../../../app/server/paciente/model/paciente');

describe('init tests', () => {
  it('should init tests', () => {
    expect(1).toBe(1)
  });
});


describe('test criação de paciente', () => {
  it('should init tests', () => {
    paciente.init('joao', '88888888', 'joso@emal', '12/12/2017', 'rua');
    expect(paciente._id).toBe(new Date().toISOString());
  });

});

