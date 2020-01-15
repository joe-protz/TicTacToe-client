'use strict'
const api = require('./api')
const ui = require('./ui')
const store = require('../store')
let aiTurnFinished = true
let difficulty = 'easy'
const takeTurn = function (event) {
  if (!store.gameOver) {
    if (aiTurnFinished) {
      if (!($(`#${event.target.id}`).hasClass('clicked'))) { // if the spot on the board does not have the class clicked ,  add the move to the board and add the class to the spot
        $('.warnings').text('')
        $(`#${event.target.id}`).text(store.currentTurn).addClass('clicked')
        store.occupiedSpots[event.target.id.slice(3)] = store.currentTurn // add the move to the store.occupiedSpots array
        store.currentIndex = event.target.id.slice(3)
        store.checkWin()
        api.updateGame()
          .then(ui.updateGameSuccess)
          .then(ui.updatePlayer)
          .then(aiTurnFinished = false)
          .then(aiMove)
          .catch(ui.updateGameFail)
      } else {
        $('.warnings').text('Please click an open space')
      }
    } else {
      $('.warnings').text('Please wait for AI to finish turn.')
      setTimeout(function () {
        $('.warnings').text('')
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
    const availableIndexes = availableSpots.map(spot => spot.attr('id').slice(3)) // index #'s for all available spots
    // filter the spots left for only spots that haven't been clicked
    if (difficulty === 'easy') {
      let currentChoice = availableSpots[Math.floor((Math.random() * availableSpots.length))] // AI Base choice is random
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
    } else {
      const perfectIndex = perfectAI() // find the index representation of the best move
      const currentChoice = store.boxes[perfectIndex] // the current choice of the ai representation in the dom
      currentChoice.text(store.currentTurn).addClass('clicked') // add the x or o and don't let me click it
      store.occupiedSpots[perfectIndex] = store.currentTurn // take the turn in the board representation
      store.currentIndex = perfectIndex // for API, change the current index
    }
    store.checkWin()
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

const difficultyToggle = function (event) {
  const button = event.target.id
  if (button === 'easy-mode') {
    difficulty = 'easy'
    $('#change-color-easy').removeClass('btn-secondary').addClass('btn-primary')
    $('#change-color-hard').removeClass('btn-primary').addClass('btn-secondary')
    $('#change-color-single').removeClass('btn-primary').addClass('btn-secondary')
  } else if (button === 'hard-mode') {
    difficulty = 'hard'
    $('#change-color-hard').removeClass('btn-secondary').addClass('btn-primary')
    $('#change-color-easy').removeClass('btn-primary').addClass('btn-secondary')
    $('#change-color-single').removeClass('btn-primary').addClass('btn-secondary')
  }
}
const perfectAI = function () {
  let bestScore = -Infinity // any move is better
  let move
  for (let i = 0; i < 9; i++) { // loop through all spots
    if (store.occupiedSpots[i] === undefined) { // find available spots
      store.occupiedSpots[i] = store.currentTurn // add the x or o to the board representation
      // for (const condition of store.winConditions) {
      const score = minimax(store.occupiedSpots, 0, false) // run the minimax function for each available spot , is not maximizing because AI already 'took a turn '
      store.occupiedSpots[i] = undefined // after each loop put the board back to how it was
      if (score > bestScore) { // if the returned score is better than the previous score, keep it
        bestScore = score
        move = i // the index of the best move
      }
    }
  }
  return move
} // initiates minimax and returns the index of the optimal move

const scoreReturn = function () {
  let result = null
  for (const condition of store.winConditions) { // loop through each win condition and see iff the current player is in all 3 spots return 10 because we are maximizing score
    if (store.occupiedSpots[condition[0]] === store.currentTurn && store.occupiedSpots[condition[1]] === store.currentTurn && store.occupiedSpots[condition[2]] === store.currentTurn) {
      result = 10
    } else if (store.occupiedSpots[condition[0]] === getOtherPlayer() && store.occupiedSpots[condition[1]] === getOtherPlayer() && store.occupiedSpots[condition[2]] === getOtherPlayer()) { // if the other player would win, return -10 because their goal is to minimize their score
      result = -10
    }
  }
  if (result !== 10 && result !== -10 && store.checkforTie(store.occupiedSpots)) {
    result = 0 // if tie, return 0
  }
  return result
}// returns 10 if ai wins this turn, 0 if tie, -10 if player wins, null if none of these

const minimax = function (board, depth, isMaximizing) {
  const result = scoreReturn() // at the beginning of each pass, see if the current state of the board is a terminal condition and if so, return the score
  if (result !== null) {
    return result
  }

  if (isMaximizing) { // this happens second if player clicks first,
    let bestScore = -Infinity // the best score would be anything better than -Infinity
    for (let i = 0; i < 9; i++) {
      // Is the spot available?
      if (board[i] === undefined) {
        board[i] = store.currentTurn // temportarily place the move on the board representation
        const score = minimax(board, depth + 1, false) // re-run minimax as minimizing, checking for a terminal condition first
        board[i] = undefined // put board back
        bestScore = Math.max(score, bestScore) // find the best score and return it after all loops
      }
    }
    return bestScore
  } else {
    let bestScore = Infinity // begin at Infinity because we're minimizing
    for (let i = 0; i < 9; i++) { // loop through the available spots left
      if (board[i] === undefined) { // pick the next available spot
        board[i] = getOtherPlayer() // getOtherPlayer will return (X) if player clicked first
        const score = minimax(board, depth + 1, true) // run minimax for this version of the board, now maximizing
        board[i] = undefined
        bestScore = Math.min(score, bestScore) // find the worst score and return it
      }
    }
    return bestScore
  }
}
module.exports = {
  takeTurn,
  resetAiTurnFinished,
  difficultyToggle
}
