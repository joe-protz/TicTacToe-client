'use strict'
const gameEvents = require('./game/events')
const authEvents = require('./auth/events')
const uiEvents = require('./ui_toggles/events')

$(() => {
  $('.startup').hide()
  gameEvents.addHandlers()
  authEvents.addHandlers()
  uiEvents.addHandlers()
})
