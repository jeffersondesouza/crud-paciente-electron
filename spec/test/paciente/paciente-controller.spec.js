const { SerializedInputParser } = require('../../../app/helpers')
const { PacienteController } = require('../../../app/paciente');


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
  const informedData = SerializedInputParser.parse(serializedData);

  expect(informedData.nome).toBe('joao');
  expect(informedData.endereco).toBe('rua 2');

});



it('should test a CRUD cicle using controller', (done) => {
  const paciente = serializedData;
  let initialTotal;

  PacienteController.salvar(paciente)
    .then(res => {
      expect(res.ok).toBeTruthy();
      expect(res.id).toBe(paciente.id);
      return PacienteDAO.listarTodos()
    })
    .then(res => {
      const first = res.rows[0];
      initialTotal = res.rows.length;

      expect(res.rows.length).toBeGreaterThan(0);
      return PacienteController.buscarPorId(first.id);
    })
    .then(res => {
      expect(res.id).toBe(paciente.id);
      return PacienteController.remover(res)
    })
    .then(res => {
      expect(res.ok).toBe(paciente.id);
      return PacienteController.listarTodos()
    })
    .then(res => {
      expect(initialTotal).toBeGreaterThan(res.rows.length);
    })

    .catch(error => {
      expect(initialTotal).toBeFalsy();
    })

  done();
});


it('should list all data', (done) => {
  const paciente = serializedData;
  let initialTotal;

  PacienteController.listarTodos()
    .then(res => {
      const first = res.rows[0];
      initialTotal = res.rows.length;
      expect(res.rows.length).toBeGreaterThan(0);
    })
    .catch(error => {
      expect(initialTotal).toBeFalsy();
    })

  done();
});




