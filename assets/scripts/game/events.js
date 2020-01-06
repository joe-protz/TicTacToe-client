const logic = require('./logic')

const addHandlers = function () {
  $('#box0').on('click', logic.onAttemptTurn)
  $('#box1').on('click', logic.onAttemptTurn)
  $('#box2').on('click', logic.onAttemptTurn)
  $('#box3').on('click', logic.onAttemptTurn)
  $('#box4').on('click', logic.onAttemptTurn)
  $('#box5').on('click', logic.onAttemptTurn)
  $('#box6').on('click', logic.onAttemptTurn)
  $('#box7').on('click', logic.onAttemptTurn)
  $('#box8').on('click', logic.onAttemptTurn)
}

module.exports = {
  addHandlers
}
