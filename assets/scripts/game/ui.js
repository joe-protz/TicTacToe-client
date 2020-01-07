'use strict'
const store = require('../store')

const displayWinner = function (currentTurn) {
  $('#messages').text(currentTurn.toUpperCase() + ' is the winner!!')
}

const updatePlayer = function () {
  store.currentTurn === 'X' ? store.currentTurn = 'O' : store.currentTurn = 'X'
  $('#currentTurn').text((`Current player is ${store.currentTurn}`))
}

const resetBoard = function () {
  store.boxes.forEach(box => {
    box.removeClass('clicked').text('')
  })
  $('#messages').text('')
  $('.warnings').text('')
  $('#currentTurn').text('Current player is X')
} // removes clicked class from boxes, resets text, resets all messages

const showGame = function () {
  $('#play').show()
  $('#currentTurn').show()
}
const updateGameSuccess = function (response) {
  console.log(response)
}
const updateGameFail = function () {
  $('.warnings').text('Sorry, your game file could not be updated')
}

module.exports = {
  displayWinner,
  updatePlayer,
  resetBoard,
  showGame,
  updateGameSuccess,
  updateGameFail
}
