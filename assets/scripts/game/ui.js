const logic = require('./logic')

const displayWinner = function (currentTurn) {
 $('#messages').text(currentTurn.toUpperCase() + ' is the winner!!')
}


const updatePlayer = function () {
  logic.currentTurn === 'x' ? logic.currentTurn = 'o' : logic.currentTurn = 'x'

}
module.exports = {
  displayWinner,
  updatePlayer
}
