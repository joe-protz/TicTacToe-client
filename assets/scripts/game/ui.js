'use strict'
const store = require('../store')
const api = require('./api')

const displayWinner = function (currentTurn) {
  $('#messages').text(currentTurn.toUpperCase() + ' is the winner!! Please click Create Game to play again')
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
  api.getGames()
    .then(getGamesSuccess)
    .catch(getGamesFail)
  // TODO: Rethink logic, can we make it so we can only make a move AFTER the game is updated????
}
const updateGameFail = function () {
  $('.warnings').text('Sorry, your game file could not be updated')
}
const createGameFail = function () {
  $('.warnings').text('Sorry, your game could not be created')
}

const getGamesSuccess = function (response) {
  store.completedGames = response.games
  let wins = 0
  for (let i = 0; i < store.completedGames.length; i++) {
    if (store.checkPastWins(store.completedGames[i])) {
      wins++
    }
  }

  $('#stats').text('Hello ' + store.user.email + '! You have completed ' + store.completedGames.length + ' games, and you have won ' + wins)
}

const getGamesFail = function () {
  $('.warnings').text('Sorry, your game files were not able to be loaded')
}
module.exports = {
  displayWinner,
  updatePlayer,
  resetBoard,
  showGame,
  updateGameSuccess,
  updateGameFail,
  createGameFail,
  getGamesFail,
  getGamesSuccess
}
