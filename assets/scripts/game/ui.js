const store = require('../store')
console.log(store.currentTurn)
const displayWinner = function (currentTurn) {
 $('#messages').text(currentTurn.toUpperCase() + ' is the winner!!')
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
}
module.exports = {
  displayWinner,
  updatePlayer,
  resetBoard
}
