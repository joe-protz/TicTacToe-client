'use strict'
const api = require('./api')
const ui = require('./ui')
const store = require('../store')
const ai = require('./ai')

const winConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical
  [0, 4, 8], [2, 4, 6]]// diagonal
let playAi = false
let turnComplete = true // TODO: Make sure this is working as intended

const onCreateGame = function () {
  api.createGame()
    .then(gameCreate)
    .catch(ui.createGameFail)
}

const onAttemptTurn = function (event) {
  if (!playAi) {
    takeTurn(event)
  } else {
    ai.takeTurn(event)
  }
}
const takeTurn = function (event) {
  if (!store.gameOver) {
    if (turnComplete) { // dont let one player override the other if network connection is bad
      if (!($(`#${event.target.id}`).hasClass('clicked'))) { // if the spot on the board does not have the class clicked ,  add the move to the board and add the class to the spot
        $('.warnings').text('')
        turnComplete = false
        $(`#${event.target.id}`).text(store.currentTurn).addClass('clicked')
        store.occupiedSpots[event.target.id.slice(3)] = store.currentTurn // add the move to the store.occupiedSpots array
        store.currentIndex = event.target.id.slice(3)

        if (checkWin()) {
          ui.displayWinner(store.currentTurn)
        } else if (checkforTie(store.occupiedSpots)) {
          $('#messages').text('Its a tie! Please click create game to play again')

          store.gameOver = true
        }
        api.updateGame()
          .then(ui.updateGameSuccess)
          .then(turnComplete = true)
          .catch(ui.updateGameFail)
        ui.updatePlayer() // this updates both the variable as well as the ui
      } else {
        $('.warnings').text('Please click an open space')
      }
    } else {
      $('.warnings').text('Please wait for game to update')
    }
  } else {
    $('.warnings').text('Please click Create Game to play again!')
    setTimeout(function () {
      $('.warnings').text('')
    }, 2000)
  }
}

// main function called each time a click is made

const checkWin = function () {
  let won = false
  for (const condition of winConditions) {
    if (store.occupiedSpots[condition[0]] === store.currentTurn && store.occupiedSpots[condition[1]] === store.currentTurn && store.occupiedSpots[condition[2]] === store.currentTurn) {
      won = true
      store.gameOver = true
    }
  }
  return won
} // returns if a player has won
store.checkWin = checkWin

const checkPastWins = function (game) {
  const cells = game.cells
  let hasWon = false
  for (const condition of winConditions) {
    if (cells[condition[0]] === 'X' && cells[condition[1]] === 'X' && cells[condition[2]] === 'X') {
      hasWon = true
    }
  }
  return hasWon
} // accepts array of gmames and returns amt of wins for X
store.checkPastWins = checkPastWins // for ui to access

const checkforTie = function (array) {
  const positionIsEmpty = []
  for (const spot of array) {
    if (spot === 'X' || spot === 'O') {
      positionIsEmpty.push(spot)
    }
  }

  return (positionIsEmpty.length === 9)
} // return true if tie is reached
store.checkforTie = checkforTie

const gameCreate = function (response) {
  store.currentTurn = 'X'
  store.gameOver = false
  store.occupiedSpots = new Array(9)
  turnComplete = true
  ai.resetAiTurnFinished()
  ui.resetBoard()
  ui.showGame()
  store.game = response.game
}

const toggleAi = function () {
  !playAi
    ? $('#toggle-ai').removeClass('btn-outline-secondary').addClass('btn-outline-primary')
    : $('#toggle-ai').removeClass('btn-outline-primary').addClass('btn-outline-secondary')

  playAi = !playAi
} // if button is pressed, play AI

module.exports = {
  onAttemptTurn,
  onCreateGame,
  toggleAi
}
