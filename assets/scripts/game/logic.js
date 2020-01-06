const ui = require('./ui')
const store = require('../store')

let occupiedSpots = new Array(9)
let gameOver = false

const onAttemptTurn = function (event) {
  if (!gameOver) {
    if (!($(`#${this.id}`).hasClass('clicked'))) { // if the spot on the board does not have the class clicked ,  add the move to the board and add the class to the spot
      $(`#${this.id}`).text(store.currentTurn).addClass('clicked')
      occupiedSpots[this.id.slice(3)] = store.currentTurn // add the move to the occupiedSpots array
      if (checkWin()) {
        ui.displayWinner(store.currentTurn)
      }
      ui.updatePlayer()

    }
  }
}

const checkWin = function () {
  let won = false
  const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical
    [0, 4, 8], [2, 4, 6]]// diagonal
  for (const condition of winConditions) {
    if (occupiedSpots[condition[0]] === store.currentTurn && occupiedSpots[condition[1]] === store.currentTurn && occupiedSpots[condition[2]] === store.currentTurn) {
      won = true
      gameOver = true
    }
  }
  return won
}

const gameReset = function () {
  store.currentTurn = 'X'
  gameOver = false
  occupiedSpots = occupiedSpots.map(slot => '')
  ui.resetBoard()

}
module.exports = {
  onAttemptTurn,
  gameReset
}
