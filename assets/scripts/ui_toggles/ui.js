'use strict'
const store = require('../store')
let crazyMode = false
let lightMode = true
const activateDarkMode = function () {
  if (crazyMode) {
    clearInterval(crazyTimer)
    crazyMode = false
    $('.innerGameBoard').removeClass('rotated')
    store.boxes.forEach(element => element.removeClass('rotated'))
  }
  $('body').css('background', 'rgb(45, 50, 57)')
  $('.board').removeClass('border-dark').addClass('border-secondary')
    .removeClass('border-white')
  lightMode = false
}
const activateLightMode = function () {
  if (crazyMode) {
    clearInterval(crazyTimer)
    crazyMode = false
    $('.innerGameBoard').removeClass('rotated')
    store.boxes.forEach(element => element.removeClass('rotated'))
  }
  $('body').css('background', '#D0E4FC')
  $('.board').addClass('border-dark').removeClass('border-secondary')
    .removeClass('border-white')
  lightMode = true
}
let crazyTimer

const toggleCrazyMode = function () {
  if (crazyMode) {
    $('.innerGameBoard').removeClass('rotated')
    store.boxes.forEach(element => element.removeClass('rotated'))
    clearInterval(crazyTimer)
    if (lightMode) {
      activateLightMode()
    } else {
      activateDarkMode()
    }
    crazyMode = false
  } else {
    crazyMode = true
    const body = $('body')
    const colors = ['red', 'green', 'blue', 'yellow', 'pink', 'purple', 'orange', 'black', 'teal']
    let currentIndex = 0
    $('.innerGameBoard').addClass('rotated')
    store.boxes.forEach(element => element.addClass('rotated'))
    crazyTimer = setInterval(function () {
      body.css({
        backgroundColor: colors[currentIndex]
      })
      if (!colors[currentIndex]) {
        currentIndex = 0
      } else {
        currentIndex++
      }
    }, 100)
  }
}

const endCrazyMode = function () {
  crazyMode = true
  toggleCrazyMode()
}

const buttonToggle = function () {
if (crazyMode) {
  $('.dark-mode').removeClass('btn-primary').addClass('btn-secondary')
  $('.light-mode').removeClass('btn-primary').addClass('btn-secondary')

} else if (lightMode) {
  $('.dark-mode').removeClass('btn-primary').addClass('btn-secondary')
  $('.light-mode').removeClass('btn-secondary').addClass('btn-primary')
} else {
  $('.dark-mode').removeClass('btn-secondary').addClass('btn-primary')
  $('.light-mode').removeClass('btn-primary').addClass('btn-secondary')
}
}
module.exports = {
  activateDarkMode,
  activateLightMode,
  endCrazyMode,
  toggleCrazyMode,
  buttonToggle
}
