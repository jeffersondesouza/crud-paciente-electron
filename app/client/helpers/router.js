const { ipcRenderer } = require('electron');

const $ = require('jquery');

const navegateTo = (linkId) => {
  const linkTemplate = $(`link[rel="import"]#${linkId}`)[0];
  const template = linkTemplate.import.querySelector(`template#${linkId}`);
  const clone = document.importNode(template.content, true);
  $('#main-content').html(clone);
}

const listenRouting = (defaultPageId) => {
  navegateTo(defaultPageId)
  $('body').click((event) => {
    const section = event.target.dataset.section;
    if (section) {
      navegateTo(section);
      console.log('oal');
      ipcRenderer.send('reload-pacoentee')
    }
  });

}

module.exports = { listenRouting };

