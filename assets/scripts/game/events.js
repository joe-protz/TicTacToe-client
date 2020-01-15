'use strict'
const logic = require('./logic')
const store = require('../store')
const ai = require('./ai')
store.currentTurn = 'X'
store.gameOver = false
store.occupiedSpots = new Array(9)
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
  $('#box0').on('click', logic.onAttemptTurn)
  $('#box1').on('click', logic.onAttemptTurn)
  $('#box2').on('click', logic.onAttemptTurn)
  $('#box3').on('click', logic.onAttemptTurn)
  $('#box4').on('click', logic.onAttemptTurn)
  $('#box5').on('click', logic.onAttemptTurn)
  $('#box6').on('click', logic.onAttemptTurn)
  $('#box7').on('click', logic.onAttemptTurn)
  $('#box8').on('click', logic.onAttemptTurn)
  $('#create-game').on('click', logic.onCreateGame)
  $('.play-ai').on('click', logic.playAiToggle)
    .on('click', ai.difficultyToggle)
}

module.exports = {
  addHandlers
}
