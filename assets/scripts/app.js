'use strict'
const gameEvents = require('./game/events')
const authEvents = require('./auth/events')

$(() => {
  $('.gameBoard').hide()
  $('#currentTurn').hide()
  $('#pw-form').hide()
  gameEvents.addHandlers()
  authEvents.addHandlers()
})
