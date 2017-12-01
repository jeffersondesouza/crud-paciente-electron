const $ = require('jquery');

$('body').on('click', (event) => {

  if (event.target.dataset.section) {
    console.log('body section')

  }
})
