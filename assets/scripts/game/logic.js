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

// create API game and JS representation, then reset the logic and DOM to defaults
const onCreateGame = function () {
  $('#messages').text('Creating game')
  $('.loading').show()
  api.createGame()
    .then(gameCreate)
    .catch(ui.createGameFail)
    .then(response => {
      $('.loading').hide()
    })
}

// restore all defaults for  API, DOM, and JS representation
const gameCreate = function (response) {
  storeReset(response)
  ai.resetAiTurnFinished()
  turnComplete = true
  ui.resetBoard()
}

const storeReset = function (response) {
  store.game = response.game
  store.currentTurn = 'X'
  store.gameOver = false
  store.occupiedSpots = new Array(9).fill(undefined)
}

// allow toggle betweeen single play and AI play
const onAttemptTurn = function (event) {
  if (!playAi) {
    takeTurn(event)
  } else {
    ai.takeTurn(event)
  }
}

// main function called each time a click is made in single player mode
const takeTurn = function (event) {
  if (store.gameOver || (!($(event.target).text() === ' '))) { return }
  if (!turnComplete) {
    $('.warnings').text('Please wait for game to update')
    return
  } // dont let one player override the other if network connection is bad
  turnSuccess()
  checkWin()
  checkforTie(store.occupiedSpots, true)
  updateState()
}

// update game data and allow the player to take next move
const turnSuccess = function () {
  $('.warnings').text('')
  turnComplete = false
  $(event.target).text(store.currentTurn)
  store.occupiedSpots[event.target.id] = store.currentTurn // add the move to the store.occupiedSpots array
  store.currentIndex = event.target.id
}

// updates API representation of game as well as the current player
const updateState = function () {
  api.updateGame()
    .then(ui.updateGameSuccess)
    .then(turnComplete = true)
    .catch(ui.updateGameFail)
  ui.updatePlayer()
}

// checks for a win, and if it finds one updates the winning tiles to green
const checkWin = function () {
  for (const condition of store.winConditions) { // if any combination of win conditions are met, then don't check for a tie , change game state, and display winner
    if (store.occupiedSpots[condition[0]] === store.currentTurn && store.occupiedSpots[condition[1]] === store.currentTurn && store.occupiedSpots[condition[2]] === store.currentTurn) {
      ui.winnerView(condition)
      store.gameOver = true
      return true
    }
  }
}
store.checkWin = checkWin // for AI file

// accepts game obkect from API  and returns true if  X won
store.checkPastWins = function (game) {
  const cells = game.cells
  return store.winConditions.some(condition => cells[condition[0]] === 'X' && cells[condition[1]] === 'X' && cells[condition[2]] === 'X')
}

// accepts an array representation of game state and returns if there is a tie. accepts boolean to decide if the game should be updated based on outcome
const checkforTie = function (array, updateGame) {
  if (updateGame && (array.every(position => position !== undefined)) && !store.gameOver) {
    ui.showTieView()
    store.gameOver = true
    return true
  }
  return array.every(position => position !== undefined)
}

store.checkforTie = checkforTie

// These functions toggle button classes for visuals as well as
// actual game logic to decide if AI is being played
const playAiToggle = function (event) {
  const button = event.target.id
  if (button === 'single-player') {
    ui.toggleDifficultyButton('singlePlayer')
    playAi = false
  } else {
    playAi = true
  }
}
const turnAiOff = function () {
  playAi = false
  ui.toggleDifficultyButton('singlePlayer')
}
module.exports = {
  onAttemptTurn,
  onCreateGame,
  playAiToggle,
  turnAiOff
}
