'use strict'
let crazyMode = false
let darkMode = false
let lightMode = false
const activateDarkMode = function () {
  if (crazyMode) {
    clearInterval(crazyTimer)
    crazyMode = false
  }
  $('body').css('background', 'rgb(45, 50, 57)')
  $('.board').removeClass('border-dark').addClass('border-secondary')
  lightMode = false
  darkMode = true
}
const activateLightMode = function () {
  if (crazyMode) {
    clearInterval(crazyTimer)
    crazyMode = false
  }
  $('body').css('background', '#D0E4FC')
  $('.board').addClass('border-dark').removeClass('border-secondary')
  lightMode = true
  darkMode = false

}
let crazyTimer

const toggleCrazyMode = function () {
  if (crazyMode) {
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
    $('.innerGameBoard').css('transform', 'rotate3d(1, .4, 0, 70deg)')
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
module.exports = {
  activateDarkMode,
  activateLightMode,
  toggleCrazyMode
}
