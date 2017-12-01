
const $ = require('jquery');

$('#lista-pacientes').click();


$('body').click((event) => {
  const section = event.target.dataset.section;
  if (section) {
    navegateTo(section);
  }
});

function navegateTo(linkId) {
  const linkTemplate = $(`link[rel="import"]#${linkId}`)[0];
  const template = linkTemplate.import.querySelector(`template#${linkId}`);
  const clone = document.importNode(template.content, true);
  $('#main-content').html(clone);

}
navegateTo('lista-pacientes')

