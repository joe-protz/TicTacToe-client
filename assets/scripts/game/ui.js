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
const updateGameSuccess = function () {
console.log('you updated a game bitch!')

}
const updateGameFail = function () {
console.log('you did not updated a game bitch!')

}

module.exports = {
  displayWinner,
  updatePlayer,
  resetBoard,
  showGame,
  updateGameSuccess,
  updateGameFail
}
