'use strict'
const gameEvents = require('./game/events')
const authEvents = require('./auth/events')

$(() => {
  $('.gameBoard').hide()
  $('#currentTurn').hide()
  gameEvents.addHandlers()
  authEvents.addHandlers()

})
