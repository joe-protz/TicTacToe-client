'use strict'
const api = require('./api')
const ui = require('./ui')
const store = require('../store')

let player1 = 'X'
let ai = 'O'
let playAi = false

let occupiedSpots = new Array(9)
let gameOver = false

const onCreateGame = function () {
  api.createGame()
    .then(gameCreate)
    .catch(ui.createGameFail)
}

const onAttemptTurn = function (event) {
if (!playAi) {
  if (!gameOver) {

    if (!($(`#${this.id}`).hasClass('clicked'))) { // if the spot on the board does not have the class clicked ,  add the move to the board and add the class to the spot
      $('.warnings').text('')

      $(`#${this.id}`).text(store.currentTurn).addClass('clicked')
      occupiedSpots[this.id.slice(3)] = store.currentTurn // add the move to the occupiedSpots array
      store.currentIndex = this.id.slice(3)
      api.updateGame()
        .then(ui.updateGameSuccess)
        .catch(ui.updateGameFail)

      if (checkWin()) {
        ui.displayWinner(store.currentTurn)
        api.updateGame()
          .then(ui.updateGameSuccess)
          .catch(ui.updateGameFail)
      }
      ui.updatePlayer() // this updates both the variable as well as the ui
      if (checkforTie(occupiedSpots)) {
        $('#messages').text('Its a tie! Please click create game to play again')
        gameOver = true
        store.gameOver = true
        api.updateGame()
          .then(ui.updateGameSuccess)
          .catch(ui.updateGameFail)
      }
    } else {
      $('.warnings').text('Please click an open space')
    }
  } else {
    $('.warnings').text('Please click Create Game to play again!')
    setTimeout(function () {
      $('.warnings').text('')
    }, 2000)
  }
}
}
 // main function called each time a click is made

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
      store.gameOver = true
    }
  }
  return won
} // returns if a player has won

const checkPastWins = function (game) {
  const cells = game.cells
  let hasWon = false
  const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]]
  for (const condition of winConditions) {
    if (cells[condition[0]] === 'X' && cells[condition[1]] === 'X' && cells[condition[2]] === 'X') {
      hasWon = true
    }
  }
  return hasWon
}
store.checkPastWins = checkPastWins
const checkforTie = function (array) {
  const positionIsEmpty = []
  for (const spot of array) {
    if (spot === 'X' || spot === 'O') {
      positionIsEmpty.push(spot)
    }
  }

  return (positionIsEmpty.length === 9)
} // return true if tie is reached

const gameCreate = function (response) {
  store.currentTurn = 'X'
  gameOver = false
  occupiedSpots = new Array(9)
  ui.resetBoard()
  ui.showGame()
  store.game = response.game
}
module.exports = {
  onAttemptTurn,
  onCreateGame
}
