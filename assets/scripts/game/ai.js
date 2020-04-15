'use strict'

const api = require('./api')
const ui = require('./ui')
const store = require('../store')
let aiTurnFinished = true // For helping with race conditions
let difficulty = 'easy'
let wins = 0 // TODO: Create visual for player to know how many wins they have achieved as well as repurpose to
// 'challenge mode', possibly allow crazy mode to be gated behind a streak
let ties = 0

// Takes a click event when AI mode is active and attempts to take a turn , then activates ai
const takeTurn = function (event) {
  if (store.gameOver || (!($(event.target).text() === ' '))) {
    return
  }
  if (!aiTurnFinished) {
    ui.waitForTurn()
    return
  }
  $('.warnings').text('')
  $(event.target).text(store.currentTurn)
  $(event.target).attr('data-descr', '')
  store.occupiedSpots[event.target.id] = store.currentTurn // add the move to the store.occupiedSpots array
  store.currentIndex = event.target.id
  updateGameState()
  playerIsDone() // calls ai move
}

// if hard mode is active, simply call minimax. if not, ai will have higher chances of either using minimax or
// taking win spots and blocking wins based on amount of wins since reset. If all 'smart' moves are not called, random is used.
const aiMove = function () {
  if (!store.gameOver) {
    const oddsScale = 0.5
    const chance = Math.round(Math.random() * 10)
    if (difficulty === 'easy' && (chance) >= wins * oddsScale) { // using probability scaling to decide if turn is optimal or 'easy'
      let currentChoice = takeRandomSpot()
      currentChoice = takeEducatedSpot(currentChoice, chance, oddsScale) // if odds are bad and there is a win spot or block, ai will take it, if not it will return the same random choice
      const spotID = currentChoice.attr('id') // the ID of this spot
      aiUpdateBoard(currentChoice, spotID)
    } else {
      const perfectIndex = perfectAI() // find the index representation of the best move
      const currentChoice = store.boxes[perfectIndex] // the current choice of the ai representation in the dom
      aiUpdateBoard(currentChoice, perfectIndex)
    }
    aiUpdateGameState()
    api.updateGame()
      .then(ui.updateGameSuccess)
      .then(aiTurnFinished = true)
      .catch(ui.updateGameFail)
  }
  ui.updatePlayer()
}

// checks for wins and ties, and updates resets win/tie counters if ties are >5
const aiUpdateGameState = function () {
  store.checkWin()
  store.checkforTie(store.occupiedSpots, true)

  if (store.checkWin() || ties > 5) { // condition for resetting wins and ties
    wins = 0
    ties = 0
  }
}

// check for wins and ties, increments counts if one is found
const updateGameState = function () {
  store.checkWin()
  store.checkforTie(store.occupiedSpots, true)
  if (store.checkforTie(store.occupiedSpots, false)) {
    ties++
  }
  if (store.checkWin()) {
    wins++
  }
}

const playerIsDone = function () {
  api.updateGame()
    .then(ui.updateGameSuccess)
    .then(ui.updatePlayer)
    .then(aiTurnFinished = false)
    .then(aiMove)
    .catch(ui.updateGameFail)
}

// returns opposite player
const getOtherPlayer = function () {
  let otherPlayer
  store.currentTurn === 'X' ? otherPlayer = 'O' : otherPlayer = 'X' // TODO: Rethink  logic to refactor
  return otherPlayer
}

const resetAiTurnFinished = function () {
  aiTurnFinished = true
}

// choses a random spot for ai based on available positions
const takeRandomSpot = function () {
  const availableSpots = store.boxes.filter(box => (box.text() === ' '))
  return availableSpots[Math.floor((Math.random() * availableSpots.length))]
}

// checks for win spots and spots to block wins for ai. takes these spots if odds are in favor of doing so
const takeEducatedSpot = function (currentChoice, chance, oddsScale) {
  chance = Math.round(Math.random() * 10) // reset random number for more desirable AI behavior
  const aiWinsCurrent = checkAiWins(store.currentTurn)
  const aiWinsOther = checkAiWins(getOtherPlayer())

  if (aiWinsCurrent && chance < oddsScale * (wins + 1)) { // if there is a win spot, and the chance wasn't in your favor,  take it
    currentChoice = store.boxes[aiWinsCurrent]
  } else if (aiWinsOther && chance < oddsScale * (wins + 1)) {
    // if there is a way to block a win  and the chance wasn't in your favor,  take it
    currentChoice = store.boxes[aiWinsOther]
  }
  return currentChoice
}

// upatws game array , DOM, and index for API
const aiUpdateBoard = function (currentChoice, index) {
  currentChoice.text(store.currentTurn)
  store.occupiedSpots[index] = store.currentTurn // put the play into the board array
  store.currentIndex = index // store the current index to use for the update game
}

const difficultyToggle = function (event) {
  const button = event.target.id
  if (button === 'easy-mode') {
    difficulty = 'easy'
    ui.toggleDifficultyButton('easyMode')
  } else if (button === 'hard-mode') {
    difficulty = 'hard'
    ui.toggleDifficultyButton('hardMode')
  }
}
//  function called on hard mode. utilizes minimax algorithm and returns the index of the optimal move
const perfectAI = function () {
  let bestScore = -Infinity // any move is better
  let move
  for (let i = 0; i < 9; i++) { // loop through all spots
    if (store.occupiedSpots[i] === undefined) { // find available spots
      store.occupiedSpots[i] = store.currentTurn // add the x or o to the board representation
      const score = minimax(store.occupiedSpots, 0, false) // run the minimax function for each available spot , is not maximizing because AI already 'took a turn '
      store.occupiedSpots[i] = undefined // after each loop put the board back to how it was
      if (score > bestScore) { // if the returned score is better than the previous score, keep it
        bestScore = score
        move = i // the index of the best move
      }
    }
  }
  return move
}

// returns 10 if ai wins this turn, 0 if tie, -10 if player wins, null if none of these. used for minimax
const scoreReturn = function () {
  let result = null
  for (const condition of store.winConditions) { // loop through each win condition and see iff the current player is in all 3 spots return 10 because we are maximizing score
    if (store.occupiedSpots[condition[0]] === store.currentTurn && store.occupiedSpots[condition[1]] === store.currentTurn && store.occupiedSpots[condition[2]] === store.currentTurn) {
      result = 10
    } else if (store.occupiedSpots[condition[0]] === getOtherPlayer() && store.occupiedSpots[condition[1]] === getOtherPlayer() && store.occupiedSpots[condition[2]] === getOtherPlayer()) { // if the other player would win, return -10 because their goal is to minimize their score
      result = -10
    }
  }
  if (result !== 10 && result !== -10 && store.checkforTie(store.occupiedSpots, false)) {
    result = 0 // if tie, return 0
  }
  return result
}

// recursively checks every possible outcome with the goal of not losing, and winning in as few moves as possible
const minimax = function (board, depth, isMaximizing) {
  const result = scoreReturn() // at the beginning of each pass, see if the current state of the board is a terminal condition and if so, return the score.. Meaning, if a tie or win was found, report whether it was a win, loss, or tie
  if (result !== null) {
    return result
  }

  if (isMaximizing) {
    let bestScore = -Infinity // the best score would be anything better than -Infinity
    for (let i = 0; i < 9; i++) {
      // Is the spot available?
      if (board[i] === undefined) {
        board[i] = store.currentTurn // temportarily place the move on the board representation
        const score = minimax(board, depth + 1, false) // re-run minimax as minimizing, checking for a terminal condition first
        board[i] = undefined // put board back
        bestScore = (Math.max(score - depth, bestScore)) // find the best score and return it after all loops. Deduct depth because it shows how many turns it took to get to this score, so the algorith can take moves that lead to wins faster
      }
    }
    return bestScore
  } else { // this happens first because the ai takes a move before checking minimax, meaning the next move would be the players
    let bestScore = Infinity // begin at Infinity because we're minimizing
    for (let i = 0; i < 9; i++) { // loop through the available spots left
      if (board[i] === undefined) { // pick the next available spot
        board[i] = getOtherPlayer() // getOtherPlayer will return (X) if player clicked first
        const score = minimax(board, depth + 1, true) // run minimax for this version of the board, now maximizing
        board[i] = undefined
        bestScore = Math.min(score + depth, bestScore) // find the worst score and return it
      }
    }
    return bestScore
  }
}
// accepts a win condition in the form of 3 spots and the current turn, checks the 3 possible ways the win condition could be arranged, and if it finds a possible win, it returns the index of the spot to take.
const winIndex = function (spot1, spot2, spot3, turn) {
  const combos = [
    [ [spot1], [spot2], [spot3] ],
    [ [spot1], [spot3], [spot2] ],
    [ [spot3], [spot2], [spot1] ]
  ]
  for (const combo of combos) {
    if (store.occupiedSpots[combo[0]] === turn && store.occupiedSpots[combo[1]] === turn && store.occupiedSpots[combo[2]] === undefined) {
      return combo[2]
    }
  }
}

// finds if there is a spot on the board for the player passed in that will cause a win by passing win conditions to winIndex. accepts a turn state x or o
const checkAiWins = function (turn) {
  const winIndexes = store.winConditions.map(condition => winIndex(condition[0], condition[1], condition[2], turn)) // maps out the results of calling winIndex on each win condition, if a win is found, the index needed to win is stored in winIndexes.
  for (let i = 0; i < winIndexes.length; i++) {
    if (winIndexes[i]) { // if a win index exists, return it. TODO: Rethink this logic
      return winIndexes[i]
    }
  }
}

const resetSession = function () {
  wins = 0
  ties = 0
}

module.exports = {
  takeTurn,
  resetAiTurnFinished,
  resetSession,
  difficultyToggle
}
