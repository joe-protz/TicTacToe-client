'use strict'
const gameEvents = require('./game/events')
const authEvents = require('./auth/events')
const darkModeEvents = require('./darkMode/events')

$(() => {
  $('.gameBoard').hide()
  $('#currentTurn').hide()
  $('#pw-form').hide()
  $('#create-game').hide()
  gameEvents.addHandlers()
  authEvents.addHandlers()
  darkModeEvents.addHandlers()
})
