# CRUD de pacientes baseado em Electron.js

## Rodar ambiente
```
npm install
npm run start
```

## Rodar testes
```
npm run test
```

### Tecnologias

#### Electron
A aplicação utiliza o ambiente do Electron, consequentemente podemos utilizar o Node na modularização de nossa app.

#### PouchDB
Optou-se pelo PouchDB, banco de dados em javascript projetado para rodar no browser(Como usamos o electron temos o Chromium). 

Outra vantagem é que ele é facilmente sicronizável ao CouchDB, permitindo por exemplo, tornar o Couch como camada principal de percitência e o Pouch trabalahndo na sincronização de dados offline.

#### HTML, CSS, Javascript (un pouquito de jQuery) 
Por ser um escopo pequeno, optou-se pela utilização de HTML, CSS e Javascript padrão sem uso de frameworks main strem como React, Vue, Angular (Não que não podessem ser utilizados). 
Utilizou-se contudo o jQuery, apenas para mostrar a flexibilidade do ambiente Electron com relação à inserção de ferramentas de terceiros em suas dependências.

### Web Components
Alguns pontos da especificção de web components foram utilizados, principalmente p uso de templates, desta forma, a aplicação faz as trocas de tela de forma mais natural ao usuário. 
Essa abordagem é uma analógia bastante simplita do que os frameworks SPA fazem

### DRY no CSS
Também não foi utilizado nenhum framework CSS como bootstrap ou materialize, ou mesmo pré processadores, mas os princípios e dos mesmo foram aplicados no intuito de padronizar e não de repitir nas impementações

#### Modularização
A app foi dividida em duas camadas principais, 'server' e 'client'. 
Foram criados modulos de:
  - Comunicação com o BD;
  - Controladores de acesso e transferência de infromações;
  - Comunicadores com a View no melhor estilo MVC;

Além de módulos de conversão e validadção de dados que podem ser reutilizados em qualquer ponto da app. Esta abordagem em módulos facilita tanto os testes quanto a manutenção da app.

#### Heurísticas de Nielsen
No desenvolvimento da interface foi foram levadas em consideração as famosas Heurísticas de Nielsen para permitimos uma usabilidade  agradável

### Visibilidade de qual estado estamos no sistema / Reconhecimento em vez de memorização
![Visibilidade de qual estado estamos no sistema](/assets/img/extras/N1.png)

### Relação com o mundo Real
Relacionar cores e ícones com 'coisas' que já conhecemos e nos inforomão o que fazer

![Relação com o mundo Real](/assets/img/extras/N2.png)

### Liberdade de controle fácil pro usuário
Dar ao usuário a poção de corrigir e excluir um dado, ou mesmo cancelar um processo de preenchimento de um formulário

![Relação com o mundo Real](/assets/img/extras/N3.png)


### Consistência e padrões

Manutenção nos padroẽs visuais de ações, além de manutenção de cores de textos e campos.
Ex: O email do paciente na lista de pacientes têm o mesmo estilo do links da aplicação, indizindo o usuário a vêlo como um link -> clicar neste email -> abrir um popup de envio de mensagema(apesar desta funcionalidade não ter sido feita). 

### Prevenções de erros
Ajudar o usuário a não cometer um erro de  uso como deletar um paciente errado, devendo confirmar essa ação de delete
![Relação com o mundo Real](/assets/img/extras/N6.png)

### Estética e design minimalista
![Relação com o mundo Real](/assets/img/extras/N5.png)


## Ajuda aos usuários a reconhecerem, diagnosticarem e recuperarem-se de erros
Previnir tanto o envio ao servidor de dados inconsistêntes, quanto informar ao usuário que este dado está errado ou faltando

![Relação com o mundo Real](/assets/img/extras/N4.png)

### Ajuda e documentação
![Relação com o mundo Real](/assets/img/extras/N99.png)

Não esperar que u usuáŕio divinhe as funcionalidades do sistema, apresentar textos ou ícones que o indusa a usar as funções.
OBS: Os botões de Editar e Deletar podereiam ser Ícones clássicos como o Lápis e a Lixeira
OBS 2: No caso do botão CADASTRAR CLIENTE, transmitir ess ainfoirmação via ícone nem sempre é fácil, nessa situação o texto é mais ilustrativo

