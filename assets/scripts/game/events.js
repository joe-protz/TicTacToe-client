let currentTurn = 'x'

const onAttemptTurn = function (event) {
  if (!($(`#box${this.id.slice(3)}`).hasClass('clicked'))) {
    $(`#box${this.id.slice(3)}`).text(currentTurn).addClass('clicked')
    currentTurn === 'x' ? currentTurn = 'o' : currentTurn = 'x'
  }
}

const addHandlers = function () {
  $('#box0').on('click', onAttemptTurn)
  $('#box1').on('click', onAttemptTurn)
  $('#box2').on('click', onAttemptTurn)
  $('#box3').on('click', onAttemptTurn)
  $('#box4').on('click', onAttemptTurn)
  $('#box5').on('click', onAttemptTurn)
  $('#box6').on('click', onAttemptTurn)
  $('#box7').on('click', onAttemptTurn)
  $('#box8').on('click', onAttemptTurn)
}

module.exports = {
  addHandlers
}
