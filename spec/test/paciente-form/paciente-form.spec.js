const { SerializedInputParser, FormValidator } = require('../../../app/helpers');

describe('tests form validator', () => {
  it('should validate form as false', () => {
    const requiredFields = ['nome', 'dataDeNascimento', 'email', 'telefone'];

    const isFormValid = FormValidator.validate(INVALID_MOCK, requiredFields, true);

    expect(isFormValid).toBeFalsy();

  });

  it('should validate form as true', () => {
    const requiredFields = ['nome', 'dataDeNascimento', 'email', 'telefone'];

    const isFormValid = FormValidator.validate(VALID_MOCK, requiredFields, true);

    expect(isFormValid).toBeTruthy();

  });
});



const INVALID_MOCK = { "_id": "", "_rev": "", "nome": "", "dataDeNascimento": "", "email": "", "telefone": "", "endereco": "", "cep": "", "bairro": "", "cidade": "" };


const VALID_MOCK = { "_id": "", "_rev": "", "nome": "22", "dataDeNascimento": "11/11/1111", "email": "a@email.com", "telefone": "22222222", "endereco": "", "cep": "", "bairro": "", "cidade": "" };
