const { ipcRenderer } = require('electron');
const IpcEventsEnum = require('../../server/infra/IpcEventsEnum');

const $ = require('jquery');

const navegateTo = (linkId) => {
  const linkTemplate = $(`link[rel="import"]#${linkId}`)[0];
  const template = linkTemplate.import.querySelector(`template#${linkId}`);
  const clone = document.importNode(template.content, true);
  $('#main-content').html(clone).fadeIn();
}

const listenRouting = (defaultPageId) => {
  navegateTo(defaultPageId)
  $('body').click((event) => {
    const section = event.target.dataset.section;
    if (section) {

      $('.breadcrumb__item').removeClass('active');
      $(`a#${section}`).removeClass('hidden').addClass('active');


      if (section !== "link-form-pacientes") {
        $(`a#link-form-pacientes`).addClass('hidden').remove('active');
      }


      navegateTo(section);
      ipcRenderer.send(IpcEventsEnum.TEMPLATE_LOADED);

    }
  });

}

module.exports = { listenRouting };

