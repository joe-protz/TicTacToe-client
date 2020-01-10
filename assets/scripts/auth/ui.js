'use strict'
const store = require('../store')
const gameApi = require('../game/api')
const gameUi = require('../game/ui')
const ui_toggles = require('../ui_toggles/ui')

const signUpSuccess = function (response) {
  $('#messages').text('Successfully Signed Up! Please Sign In')
  $('.warnings').text('')
}
const signUpFailure = function () {
  $('.warnings').text('Failed to Sign Up!')
  $('#messages').text('')
}

const signInSuccess = function (response) {
  $('#messages').text('Successfully Signed In! Click on Create Game to play!')
  $('.warnings').text('')
  store.user = response.user
  loggedIn = true
  gameApi.getGames()
    .then(gameUi.getGamesSuccess)
    .catch(gameUi.getGamesFail)
  changeView()
}
const signInFailure = function () {
  $('.warnings').text('Failed to Sign In!')
  $('#messages').text('')
  setTimeout(function () {
    $('.warnings').text('')
  }, 2000)
}

const signOutSuccess = function () {
  $('#messages').text('Signed out successfully')
  $('#stats').text('')
  $('.warnings').text('')
  store.user = null
  store.temp = null
  loggedIn = false
  changeView()
  ui_toggles.endCrazyMode()
}
const signOutFailure = function () {
  $('.warnings').text('Error on sign out')
}

const changePasswordSuccess = function (response) {
  $('form').trigger('reset')
  $('#messages').text('Successfully Changed Password')
  $('#pw-form').hide()
  $('.gameBoard').show()
  $('.warnings').text('')
  $('#currentTurn').show()
  $('#messages').show()
  $('#create-game').show()
  $('.light-toggle').hide()
}
const changePasswordFailure = function (response) {
  $('form').trigger('reset')
  $('.warnings').text('Failed to Change Password')
}

const openPWChange = function () {
  $('#pw-form').show()
  $('.gameBoard').hide()
  $('#currentTurn').hide()
  $('#messages').hide()
  $('.alerts').text('')
  $('.light-toggle').show()
}
const closePWChange = function () {
  $('#pw-form').hide()
  $('.gameBoard').show()
  $('#currentTurn').show()
  $('#messages').show()
  $('.alerts').text('')
  $('.light-toggle').hide()
}

let loggedIn = false
const changeView = function () {
  // TODO: ADD signed in and signed out classes to other HTML ELEMENTS for clarity!!!!!!
  if (!loggedIn) {
    $('.signedOut').show()
    $('.gameBoard').hide()
    $('#currentTurn').hide()
    $('#create-game').hide()
    $('.light-toggle').show()
  } else {
    $('.signedOut').hide()
    $('#create-game').show()
    $('.gameBoard').show()
    $('#play').hide()
    $('.light-toggle').hide()
  }
} // toggle several elements based on logged in state

module.exports = {
  signUpFailure,
  signUpSuccess,
  signInSuccess,
  signInFailure,
  signOutFailure,
  signOutSuccess,
  openPWChange,
  closePWChange,
  changePasswordFailure,
  changePasswordSuccess

}
