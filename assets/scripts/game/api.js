'use strict'
const store = require('../store')
const config = require('../config')

const createGame = function () {
  return $.ajax({
    url: config.apiUrl + '/games',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: '{}'
  })
}

const updateGame = function () {
  return $.ajax({
    url: config.apiUrl + '/games/' + store.game.id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: {
      "game": {
        "cell": {
          "index": store.currentIndex,
          "value": store.currentTurn
        },
        "over": store.gameOver

      }
}
  })

}
module.exports = {
  createGame,
  updateGame
}
