'use strict'
const store = require('../store')
let crazyMode = false
let lightMode = true
let warned = false
let crazyTimer

const activateDarkMode = function () {
  clearCrazyMode()
  $('body, .nav-tabs').css('background', 'rgb(45, 50, 57)')
  $('.tab-content').css('background', '#6C757C')
  $('.nav-tabs').css('border', '#6C757C')
  $('.nav-link active').css('background', 'rgb(45, 50, 57)')
  $('.board').removeClass('border-dark').addClass('border-secondary')
    .removeClass('border-white')
  lightMode = false
}
const activateLightMode = function () {
  clearCrazyMode()
  $('body').css('background', '#D0E4FC')
  $('.tab-content').css('background', 'white')
  $('.nav-tabs').css('background', '#D0E4FC')
  $('.nav-tabs').css('border-bottom', '#D0E4FC')
  $('.nav-link active').css('background', 'white')
  $('.board').addClass('border-dark').removeClass('border-secondary')
    .removeClass('border-white')
  lightMode = true
}


const toggleCrazyMode = function () {
  if (crazyMode) {
  clearCrazyMode()
    if (lightMode) {
      activateLightMode()
    } else {
      activateDarkMode()
    }
  } else if (warned) {
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
    // store.boxes.forEach(element => element.css({
    //   backgroundColor: colors[currentIndex]
    // }))
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
  buttonToggle()
}
const seizureWarning = function () {
  $('.toast').toast('show')
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

const hasBeenWarned = function () {
  warned = true
}

const clearCrazyMode = function () {
  if (crazyMode) {
    clearInterval(crazyTimer)
    crazyMode = false
    $('.innerGameBoard').removeClass('rotated')
    store.boxes.forEach(element => element.removeClass('rotated'))
  }
}
module.exports = {
  activateDarkMode,
  activateLightMode,
  endCrazyMode,
  toggleCrazyMode,
  buttonToggle,
  seizureWarning,
  hasBeenWarned
}
