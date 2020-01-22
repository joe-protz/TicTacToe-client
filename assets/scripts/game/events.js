'use strict'
const logic = require('./logic')
const store = require('../store')
const ai = require('./ai')

store.boxes = [
  $('#box0'),
  $('#box1'),
  $('#box2'),
  $('#box3'),
  $('#box4'),
  $('#box5'),
  $('#box6'),
  $('#box7'),
  $('#box8')
]
const addHandlers = function () {
  $('#play').on('click', logic.onAttemptTurn)
  $('#create-game').on('click', logic.onCreateGame)
  $('.play-ai').on('click', logic.playAiToggle)
    .on('click', ai.difficultyToggle)
}

module.exports = {
  addHandlers
}
