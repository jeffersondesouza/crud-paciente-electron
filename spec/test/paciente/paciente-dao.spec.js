require('require-rebuild')
const PacienteDAO = require('../../../app/paciente/dao/paciente-dao');

describe('test criação de paciente via DAO', () => {

  it('should not create data without _id', (done) => {
    const paciente = { nome: 'joao' };

    PacienteDAO.salvarPaciente(paciente)
      .then(res => {
      }).catch(error => {
        expect(error).toBeTruthy();
      })
    done();
  });

  
});
