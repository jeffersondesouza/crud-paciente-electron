require('require-rebuild')
const { PacienteDAO } = require('../../../app/server/paciente');


describe('test criação de paciente via DAO', () => {

  it('should not create data without _id', (done) => {
    const paciente = { nome: 'joao' };
    PacienteDAO.salvar(paciente)
      .then(res => {
      }).catch(error => {
        expect(error).toBeTruthy();
      })
    done();
  });

  it('should test a CRUD cicle', (done) => {
    const paciente = { _id: 'paciente', nome: 'joao' };
    let initialTotal;

    PacienteDAO.salvar(paciente)
      .then(res => {
        expect(res.ok).toBeTruthy();
        expect(res.id).toBe(paciente.id);
        return PacienteDAO.listarTodos()
      })
      .then(res => {
        const first = res.rows[0];
        initialTotal = res.rows.length;

        expect(res.rows.length).toBeGreaterThan(0);
        return PacienteDAO.buscarPorId(first.id);
      })
      .then(res => {
        expect(res.id).toBe(paciente.id);
        return PacienteDAO.remover(res)
      })
      .then(res => {
        expect(res.ok).toBe(paciente.id);
        return PacienteDAO.listarTodos()
      })
      .then(res => {
        expect(initialTotal).toBeGreaterThan(res.rows.length);
      })

      .catch(error => {
        expect(initialTotal).toBeFalsy();
      })

    done();
  });


});
