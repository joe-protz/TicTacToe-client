'use strict'
const gameEvents = require('./game/events')
const authEvents = require('./auth/events')
const uiEvents = require('./ui_toggles/events')

$(() => {
  $('.gameBoard').hide()
  $('#currentTurn').hide()
  $('#pw-form').hide()
  $('#create-game').hide()
  $('.loading').hide()
  gameEvents.addHandlers()
  authEvents.addHandlers()
  uiEvents.addHandlers()
})
