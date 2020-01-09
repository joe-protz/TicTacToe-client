'use strict'
const ui = require('./ui')

const addHandlers = function () {
  $('#dark-mode').on('click', ui.activateDarkMode)
  $('#light-mode').on('click', ui.activateLightMode)
  $('#dark-mode2').on('click', ui.activateDarkMode)
  $('#light-mode2').on('click', ui.activateLightMode)
  $('#crazy-mode').on('click', ui.toggleCrazyMode)
}

module.exports = {
  addHandlers
}
