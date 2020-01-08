'use strict'
const store = require('../store')
const gameApi = require('../game/api')
const gameUi = require('../game/ui')

const signUpSuccess = function (response) {
  $('#messages').text('Successfully Signed Up!')

}

const signUpFailure = function () {
  $('.warnings').text('Failed to Sign Up!')
  setTimeout(function () {
  $('.warnings').text('')
  }, 2000)
}

const signInSuccess = function (response) {
  $('#messages').text('Successfully Signed In! Click on Create Game to play!')
  store.user = response.user
  loggedIn = true
  gameApi.getGames()
    .then(gameUi.getGamesSuccess)
    .catch(gameUi.getGamesFail)
  changeView()
}

const signInFailure = function () {
  $('.warnings').text('Failed to Sign In!')
  setTimeout(function () {
  $('.warnings').text('')
  }, 2000)
}

const signOutSuccess = function () {
  $('#messages').text('Signed out successfully')
  $('#stats').text('')
  store.user = null
  loggedIn = false
  changeView()
}

const signOutFailure = function (error) {
  $('.warnings').text('Error on sign out')
  console.error('signOutFailure ran. Error is :', error)
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
  $('#create-game').hide()
}

const closePWChange = function () {
  $('#pw-form').hide()
  $('.gameBoard').show()
  $('#currentTurn').show()
  $('#messages').show()
  $('#create-game').show()
}

let loggedIn = false
const changeView = function () {
  // TODO: ADD signed in and signed out classes to other HTML ELEMENTS for clarity!!!!!!
  if (!loggedIn) {
    $('.signedOut').show()
    $('.gameBoard').hide()
    $('#currentTurn').hide()
    $('#create-game').hide()
  } else {
    $('.signedOut').hide()
    $('#create-game').show()
    $('.gameBoard').show()
    $('#play').hide()
  }
}

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
