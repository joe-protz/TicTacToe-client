'use strict'
const ui = require('./ui')



const addHandlers = function () {
  $('#dark-mode').on('click', ui.activateDarkMode)
  $('#light-mode').on('click', ui.activateLightMode)
}


module.exports = {
  addHandlers
}
