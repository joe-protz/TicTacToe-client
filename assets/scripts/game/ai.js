'use strict'
const api = require('./api')
const ui = require('./ui')
const store = require('../store')

const takeTurn = function (event) {
  if (!store.gameOver) {
    if (!($(`#${event.target.id}`).hasClass('clicked'))) { // if the spot on the board does not have the class clicked ,  add the move to the board and add the class to the spot
      $('.warnings').text('')
      $(`#${event.target.id}`).text(store.currentTurn).addClass('clicked')
      store.occupiedSpots[event.target.id.slice(3)] = store.currentTurn // add the move to the store.occupiedSpots array
      store.currentIndex = event.target.id.slice(3)

      if (store.checkWin()) {
        ui.displayWinner(store.currentTurn)
      } else if (store.checkforTie(store.occupiedSpots)) {
        $('#messages').text('Its a tie! Please click create game to play again')

        store.gameOver = true
      }
      api.updateGame()
        .then(ui.updateGameSuccess)
        .then(aiMove)
        .catch(ui.updateGameFail)
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

const aiMove = function () {
  if (!store.gameOver) {
    const availableSpots = store.boxes.filter(box => !(box.hasClass('clicked')))// filter the spots left for only spots that haven't been clicked
    availableSpots[Math.floor((Math.random() * availableSpots.length) )].text(store.currentTurn).addClass('clicked') // just add an x and a class clicked to the first available spot.
    const spotID = availableSpots[0].attr('id').slice(3) // the ID of this spot
    store.occupiedSpots[spotID] = store.currentTurn // put the play into the board array
    store.currentIndex = spotID // store the current index to use for the update game

    if (store.checkWin()) {
      ui.displayWinner(store.currentTurn)
    } else if (store.checkforTie(store.occupiedSpots)) {
      $('#messages').text('Its a tie! Please click create game to play again')

      store.gameOver = true
    }
    api.updateGame()
      .then(ui.updateGameSuccess)
      .catch(ui.updateGameFail)
    ui.updatePlayer()
  }
}
module.exports = {
  takeTurn
}
