'use strict'
const api = require('./api')
const ui = require('./ui')
const store = require('../store')
const player1 = 'X'
const computer = 'O'



const takeTurn = function (event) {
  if (!store.gameOver) {
    if (!($(`#${event.target.id}`).hasClass('clicked'))) { // if the spot on the board does not have the class clicked ,  add the move to the board and add the class to the spot
      $('.warnings').text('')
      $(`#${event.target.id}`).text(store.currentTurn).addClass('clicked')
      store.occupiedSpots[event.target.id.slice(3)] = store.currentTurn // add the move to the store.occupiedSpots array
      store.currentIndex = event.target.id.slice(3)
      api.updateGame()
        .then(ui.updateGameSuccess)
        .catch(ui.updateGameFail)

      if (store.checkWin()) {
        ui.displayWinner(store.currentTurn)
        api.updateGame()
          .then(ui.updateGameSuccess)
          .catch(ui.updateGameFail)
      }

      else if (store.checkforTie(store.occupiedSpots)) {
        $('#messages').text('Its a tie! Please click create game to play again')

        store.gameOver = true
        api.updateGame()
          .then(ui.updateGameSuccess)
          .catch(ui.updateGameFail)
      }
      ui.updatePlayer() // this updates both the variable as well as the ui
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




module.exports = {
  takeTurn
}
