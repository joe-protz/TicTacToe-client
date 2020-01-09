'use strict'

const store = {
  currentTurn: 'X',
  gameOver: false,
  occupiedSpots: new Array(9),
  boxes: [
    $('#box0'),
    $('#box1'),
    $('#box2'),
    $('#box3'),
    $('#box4'),
    $('#box5'),
    $('#box6'),
    $('#box7'),
    $('#box8')
  ]
}

module.exports = store
