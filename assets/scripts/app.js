'use strict'
const events = require('./game/events')

$(() => {
  events.addHandlers()
  $('.gameBoard').hide()
  $('#currentTurn').hide()
})
