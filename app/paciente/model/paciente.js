const paciente = {
  init: function (nome, telefone, email, data_de_nascimento, endereço) {
    this._id = new Date().toISOString(),
    this.nome = nome;
    this.telefone = telefone;
    this.email = email;
    this.data_de_nascimento = data_de_nascimento;
    this.endereço = endereço;
  }
}

module.exports = paciente;