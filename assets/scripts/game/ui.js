'use strict'
const store = require('../store')
const api = require('./api')

const displayWinner = function (currentTurn) {
  $('#messages').text(currentTurn + ' is the winner!! Please click Create Game to play again')
}

const updatePlayer = function () {
  store.currentTurn === 'X' ? store.currentTurn = 'O' : store.currentTurn = 'X'
  $('#currentTurn').text((`Current player is ${store.currentTurn}`))
}
 // needed because on a win, text of winning pieces turn green

const resetBoard = function () {
const color = $('body').css('color')
  store.boxes.forEach(box => {
    box.text(' ').css('color', `${color}`)
  })
  $('.warnings, #messages').text('')
  $('#play, #currentTurn').show()
  $('#currentTurn').text((`Current player is ${store.currentTurn}`))
} // removes clicked class from boxes, resets text, resets all messages

const updateGameSuccess = function (response) {
  api.getGames()
    .then(getGamesSuccess)
    .catch(getGamesFail)
}
const updateGameFail = function () {
  $('.warnings').text('Sorry, your game file could not be updated')
}
const createGameFail = function () {
  $('.warnings').text('Sorry, your game could not be created')
  $('#messages').text('')
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

const winnerView = function (condition) {
    const winColor = '#11ed46'
  condition.forEach(index => store.boxes[index].css('color', winColor))
  displayWinner(store.currentTurn)
}

const toggleDifficultyButton = function ( difficulty) {
  switch (difficulty){
  case "singlePlayer":
  $('#change-color-single').removeClass('btn-secondary').addClass('btn-primary')
  $('#change-color-easy, #change-color-hard').removeClass('btn-primary').addClass('btn-secondary')
  break
  case 'hardMode':
  $('#change-color-hard').removeClass('btn-secondary').addClass('btn-primary')
  $('#change-color-easy, #change-color-single').removeClass('btn-primary').addClass('btn-secondary')
  break
  case 'easyMode':
  $('#change-color-easy').removeClass('btn-secondary').addClass('btn-primary')
  $('#change-color-hard, #change-color-single').removeClass('btn-primary').addClass('btn-secondary')
}
}

module.exports = {
  displayWinner,
  updatePlayer,
  resetBoard,
  updateGameSuccess,
  updateGameFail,
  createGameFail,
  getGamesFail,
  getGamesSuccess,
  winnerView,
  toggleDifficultyButton
}
