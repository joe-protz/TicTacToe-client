'use strict'
const logic = require('./logic')
const store = require('../store')
const ai = require('./ai')

store.boxes = [
  $('#0'),
  $('#1'),
  $('#2'),
  $('#3'),
  $('#4'),
  $('#5'),
  $('#6'),
  $('#7'),
  $('#8')
]
// TODO : See if there is a method to extract all Ids of child of #play??
const addHandlers = function () {
  $('#play').on('click', logic.onAttemptTurn)
  $('#create-game').on('click', logic.onCreateGame)
  $('.play-ai').on('click', logic.playAiToggle)
    .on('click', ai.difficultyToggle)
}

module.exports = {
  addHandlers
}
