'use strict'
const api = require('./api')
const ui = require('./ui')
const store = require('../store')
let aiTurnFinished = true

const takeTurn = function (event) {
  if (!store.gameOver) {
    if (aiTurnFinished) {
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
          .then(ui.updatePlayer)
          .then(aiTurnFinished = false)
          .then(aiMove)
          .catch(ui.updateGameFail)
      // ui.updatePlayer() // this updates both the variable as well as the ui
      } else {
        $('.warnings').text('Please click an open space')
      }
    } else {
      $('.warnings').text()
      setTimeout(function () {
        $('.warnings').text('Please wait for AI to finish turn.')
      }, 2000)
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
    const availableSpots = store.boxes.filter(box => !(box.hasClass('clicked')))
    // filter the spots left for only spots that haven't been clicked
    let currentChoice = availableSpots[Math.floor((Math.random() * availableSpots.length))] // AI Base choice is random
    const availableIndexes = availableSpots.map(spot => spot.attr('id').slice(3)) // index #'s for all available spots
    if (checkAiWins(store.currentTurn) !== false) { // if there is a win spot, take it
      currentChoice = store.boxes[checkAiWins(store.currentTurn)]
    } else if (checkAiWins(getOtherPlayer()) !== false) { // if there is a way to block a win, take it
      currentChoice = store.boxes[checkAiWins(getOtherPlayer())]
    } else if (availableIndexes.includes('4')) {
      currentChoice = store.boxes[4] // take center
    } else if (availableIndexes.includes('0') && store.occupiedSpots[8] === getOtherPlayer()) {
      currentChoice = store.boxes[0]
    } else if (availableIndexes.includes('2') && store.occupiedSpots[6] === getOtherPlayer()) {
      currentChoice = store.boxes[2]
    } else if (availableIndexes.includes('6') && store.occupiedSpots[2] === getOtherPlayer()) {
      currentChoice = store.boxes[6]
    } else if (availableIndexes.includes('8') && store.occupiedSpots[0] === getOtherPlayer()) {
      currentChoice = store.boxes[8] // opponent took corner, and opposite is empty, take that spot
    }

    currentChoice.text(store.currentTurn).addClass('clicked') // just add an x and a class clicked to the first available spot.
    const spotID = currentChoice.attr('id').slice(3) // the ID of this spot
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
      .then(aiTurnFinished = true)
      .catch(ui.updateGameFail)
    ui.updatePlayer()
  }
}

const checkAiWins = function (turn) {
  if (store.occupiedSpots[0] === turn && store.occupiedSpots[1] === turn && store.occupiedSpots[2] === undefined) {
    return 2
  } else if (store.occupiedSpots[1] === turn && store.occupiedSpots[2] === turn && store.occupiedSpots[0] === undefined) {
    return 0
  } else if (store.occupiedSpots[2] === turn && store.occupiedSpots[0] === turn && store.occupiedSpots[1] === undefined) {
    return 1 // all row 1
  } else if (store.occupiedSpots[3] === turn && store.occupiedSpots[4] === turn && store.occupiedSpots[5] === undefined) {
    return 5
  } else if (store.occupiedSpots[4] === turn && store.occupiedSpots[5] === turn && store.occupiedSpots[3] === undefined) {
    return 3
  } else if (store.occupiedSpots[3] === turn && store.occupiedSpots[5] === turn && store.occupiedSpots[4] === undefined) {
    return 4 // all row 2
  } else if (store.occupiedSpots[6] === turn && store.occupiedSpots[7] === turn && store.occupiedSpots[8] === undefined) {
    return 8
  } else if (store.occupiedSpots[7] === turn && store.occupiedSpots[8] === turn && store.occupiedSpots[6] === undefined) {
    return 6
  } else if (store.occupiedSpots[6] === turn && store.occupiedSpots[8] === turn && store.occupiedSpots[7] === undefined) {
    return 7 // all row 3
  } else if (store.occupiedSpots[0] === turn && store.occupiedSpots[3] === turn && store.occupiedSpots[6] === undefined) {
    return 6
  } else if (store.occupiedSpots[3] === turn && store.occupiedSpots[6] === turn && store.occupiedSpots[0] === undefined) {
    return 0
  } else if (store.occupiedSpots[6] === turn && store.occupiedSpots[0] === turn && store.occupiedSpots[3] === undefined) {
    return 3 // all col 1
  } else if (store.occupiedSpots[1] === turn && store.occupiedSpots[4] === turn && store.occupiedSpots[7] === undefined) {
    return 7
  } else if (store.occupiedSpots[4] === turn && store.occupiedSpots[7] === turn && store.occupiedSpots[1] === undefined) {
    return 1
  } else if (store.occupiedSpots[7] === turn && store.occupiedSpots[1] === turn && store.occupiedSpots[4] === undefined) {
    return 4 // all col 2
  } else if (store.occupiedSpots[2] === turn && store.occupiedSpots[5] === turn && store.occupiedSpots[8] === undefined) {
    return 8
  } else if (store.occupiedSpots[5] === turn && store.occupiedSpots[8] === turn && store.occupiedSpots[2] === undefined) {
    return 2
  } else if (store.occupiedSpots[2] === turn && store.occupiedSpots[8] === turn && store.occupiedSpots[5] === undefined) {
    return 5 /// all col 3
  } else if (store.occupiedSpots[0] === turn && store.occupiedSpots[4] === turn && store.occupiedSpots[8] === undefined) {
    return 8
  } else if (store.occupiedSpots[0] === turn && store.occupiedSpots[8] === turn && store.occupiedSpots[4] === undefined) {
    return 4
  } else if (store.occupiedSpots[4] === turn && store.occupiedSpots[8] === turn && store.occupiedSpots[0] === undefined) {
    return 0 // all diag 1
  } else if (store.occupiedSpots[2] === turn && store.occupiedSpots[4] === turn && store.occupiedSpots[6] === undefined) {
    return 6
  } else if (store.occupiedSpots[4] === turn && store.occupiedSpots[6] === turn && store.occupiedSpots[2] === undefined) {
    return 2
  } else if (store.occupiedSpots[2] === turn && store.occupiedSpots[6] === turn && store.occupiedSpots[4] === undefined) {
    return 4 // all diag 2
  } return false
} // check if there is a win condition available, returns false if not
const getOtherPlayer = function () {
  let otherPlayer
  store.currentTurn === 'X' ? otherPlayer = 'O' : otherPlayer = 'X'
  return otherPlayer
} // returns opposite player

const resetAiTurnFinished = function () {
  aiTurnFinished = true
}
module.exports = {
  takeTurn,
  resetAiTurnFinished
}
