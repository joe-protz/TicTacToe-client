let currentTurn = 'x'

const onAttemptTurn = function (event) {
  if (!($(`#box${this.id.slice(3)}`).hasClass('clicked'))) {
    $(`#box${this.id.slice(3)}`).text(currentTurn).addClass('clicked')
    currentTurn === 'x' ? currentTurn = 'o' : currentTurn = 'x'
  }
}



module.exports = {
  onAttemptTurn
}
