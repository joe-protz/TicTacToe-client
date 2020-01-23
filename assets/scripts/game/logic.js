'use strict'
const api = require('./api')
const ui = require('./ui')
const store = require('../store')
const ai = require('./ai')
// win conditions are all combinations of indexes where if  the same player occupies all spots, they wins
// the game is represented in the store as store.occupiedSpots, filled with 9x undefined on game createGame
// store.currentIndex holds the last index of a turn taken
// store.currentTurn holds the current player X or O, always starting each game with X and switching with the
//  function switchPlayer

store.winConditions = [ // added to store for AI,
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

const gameCreate = function (response) {
  store.game = response.game
  const color = $('body').css('color') // needed because on a win, text of winning pieces turn green
  for (const box of store.boxes) {
    box.css('color', `${color}`)
  }
  store.currentTurn = 'X'
  store.gameOver = false
  store.occupiedSpots = new Array(9).fill(undefined)
  ai.resetAiTurnFinished()
  turnComplete = true
  ui.resetBoard()
  ui.showGame() // game is hidden until initial creation
} // just restore all defaults for  API, DOM, and JS representation

const onAttemptTurn = function (event) { // allow toggle betweeen single play and AI play
  if (!playAi) {
    takeTurn(event)
  } else {
    ai.takeTurn(event)
  }
}
const takeTurn = function (event) {
  if (store.gameOver) {
    $('.warnings').text('Please click Create Game to play again!') // TODO: Rethink warnings and messages
    setTimeout(function () {
      $('.warnings').text('')
    }, 2000)
    return
  }
  if (!turnComplete) {
    $('.warnings').text('Please wait for game to update')
    return
  } // dont let one player override the other if network connection is bad
  if (!($(event.target).text() === ' ')) {
    $('.warnings').text('Please click an open space')
    return
  } // if the spot on the board is empty let the player click

  $('.warnings').text('')
  turnComplete = false
  $(event.target).text(store.currentTurn)
  store.occupiedSpots[event.target.id] = store.currentTurn // add the move to the store.occupiedSpots array
  store.currentIndex = event.target.id
  checkWin()
  api.updateGame()
    .then(ui.updateGameSuccess)
    .then(turnComplete = true)
    .catch(ui.updateGameFail)
  ui.updatePlayer() // this updates both the variable as well as the ui
}

// main function called each time a click is made

const checkWin = function () {
  const winColor = '#11ed46'
  for (const condition of store.winConditions) { // if any combination of win conditions are met, then don't check for a tie , change game state, and display winner
    if (store.occupiedSpots[condition[0]] === store.currentTurn && store.occupiedSpots[condition[1]] === store.currentTurn && store.occupiedSpots[condition[2]] === store.currentTurn) {
      condition.forEach(condition => store.boxes[condition].css('color', winColor))
      store.gameOver = true
      ui.displayWinner(store.currentTurn)
      return true
    }
  }
  if (checkforTie(store.occupiedSpots)) {
    $('#messages').text('Its a tie! Please click create game to play again')
    store.gameOver = true
  }
} // checks for a win or tie
store.checkWin = checkWin // for AI file

store.checkPastWins = function (game) {
  const cells = game.cells
  return store.winConditions.some(condition => cells[condition[0]] === 'X' && cells[condition[1]] === 'X' && cells[condition[2]] === 'X')
} // accepts array of gmames and returns amt of wins for X

const checkforTie = function (array) {
  return array.every(position => position !== undefined)
} // return true if tie is reached or false
store.checkforTie = checkforTie

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
} // These functions toggle button classes for visuals as well as
// actual game logic to decide if AI is being played
module.exports = {
  onAttemptTurn,
  onCreateGame,
  playAiToggle,
  turnAiOff
}
