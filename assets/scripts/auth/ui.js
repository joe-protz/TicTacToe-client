'use strict'
const store = require('../store')

const signUpSuccess = function (response) {
  $('#messages').text('Successfully Signed Up!')
  console.log(response)
}

const signUpFailure = function (error) {
  $('#sign-in').trigger('reset')
  $('#sign-up').trigger('reset')
  $('#messages').text('Failed to Sign Up!')
  console.log(error)
}

const signInSuccess = function (response) {
  $('#messages').text('Successfully Signed In!')
  store.user = response.user
  loggedIn = true
  changeView()
  console.log(store.user['token'])
}

const signInFailure = function (error) {
  $('#messages').text('Failed to Sign In!')
  $('#sign-in').trigger('reset')
  $('#sign-up').trigger('reset')
  console.log(error)
}



let loggedIn = false
const changeView = function () {
  //TODO: ADD signed in and signed out classes to other HTML ELEMENTS for clarity!!!!!!
  if (!loggedIn) {
    $('.signedOut').hide()
    $('.gameBoard').hide()
    $('#currentTurn').hide()
  } else {
    $('.signedOut').hide()

    $('.gameBoard').show()
    $('#currentTurn').show()
  }
}

module.exports = {
  signUpFailure,
  signUpSuccess,
  signInSuccess,
  signInFailure
}
