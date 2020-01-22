'use strict'
const api = require('./api')
const ui = require('./ui')
const store = require('../store')
const ai = require('./ai')

store.winConditions = [ // added to store for AI
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical
  [0, 4, 8], [2, 4, 6]]// diagonal

let playAi = false
let turnComplete = true

const onCreateGame = function () { // create API game, then reset the logic and DOM to defaults
  $('#messages').text('Creating game')
  $('.loading').show()
  api.createGame()
    .then(gameCreate)
    .catch(ui.createGameFail)
    .then(response => {
      $('.loading').hide()
    })
}

const onAttemptTurn = function (event) { // allow toggle betweeen single play and AI play
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
        checkWin()
        api.updateGame()
          .then(ui.updateGameSuccess)
          .then(turnComplete = true)
          .catch(ui.updateGameFail)
          .then(response => {
          })
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
  for (const condition of store.winConditions) { // if any combination of win conditions are met, then don't check for a tie , change game state, and display winner
    if (store.occupiedSpots[condition[0]] === store.currentTurn && store.occupiedSpots[condition[1]] === store.currentTurn && store.occupiedSpots[condition[2]] === store.currentTurn) {
      store.boxes[condition[0]].css('color', '#11ed46')
      store.boxes[condition[1]].css('color', '#11ed46')
      store.boxes[condition[2]].css('color', '#11ed46')
      won = true
      store.gameOver = true
      ui.displayWinner(store.currentTurn)
    }
  }
  if (!won) { // if nobody won, check for a tie , update the messages and game state
    if (checkforTie(store.occupiedSpots)) {
      $('#messages').text('Its a tie! Please click create game to play again')

      store.gameOver = true
    }
  }
} // checks for a win and if no win, checks for a tie
store.checkWin = checkWin // for AI file

const checkPastWins = function (game) {
  const cells = game.cells
  let hasWon = false
  for (const condition of store.winConditions) {
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
} // return true if tie is reached or false
store.checkforTie = checkforTie

const gameCreate = function (response) {
  store.game = response.game
  const color = $('body').css('color')
  for (const box of store.boxes) {
    box.css('color', `${color}`)
  }
  store.currentTurn = 'X'
  store.gameOver = false
  store.occupiedSpots = new Array(9)
  ai.resetAiTurnFinished()
  turnComplete = true
  ui.resetBoard()
  ui.showGame()
} // just restore all defaults for  API, DOM, and JS representation

const playAiToggle = function (event) {
  const button = event.target.id
  if (button === 'single-player') {
    $('#change-color-single').removeClass('btn-secondary').addClass('btn-primary')
    $('#change-color-easy').removeClass('btn-primary').addClass('btn-secondary')
    $('#change-color-hard').removeClass('btn-primary').addClass('btn-secondary')
    playAi = false
  } else {
    playAi = true
  }
}
const turnAiOff = function () {
  playAi = false
  $('#change-color-single').removeClass('btn-secondary').addClass('btn-primary')
  $('#change-color-easy').removeClass('btn-primary').addClass('btn-secondary')
  $('#change-color-hard').removeClass('btn-primary').addClass('btn-secondary')
}
module.exports = {
  onAttemptTurn,
  onCreateGame,
  playAiToggle,
  turnAiOff
}
