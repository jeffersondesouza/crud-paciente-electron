const paciente = {
  init: function (nome, telefone, email, dataDeNascimento, endereço) {
    this._id = new Date().toISOString(),
    this.nome = nome;
    this.telefone = telefone;
    this.email = email;
    this.dataDeNascimento = dataDeNascimento;
    this.endereço = endereço;
  }
}

module.exports = paciente;