'use strict'
const store = require('../store')

const signUpSuccess = function (response) {
  $('#messages').text('Successfully Signed Up!')
}

const signUpFailure = function (error) {
  $('.warnings').text('Failed to Sign Up!')
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
  $('.warnings').text('Failed to Sign In!')
  console.log(error)
}

const signOutSuccess = function () {
  $('#messages').text('Signed out successfully')
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
}

const changePasswordFailure = function (response) {
  $('form').trigger('reset')
  $('.warnings').text('Failed to Change Password')
}
const openPWChange = function () {
  $('#pw-form').show()
  $('.gameBoard').hide()
}

let loggedIn = false
const changeView = function () {
  // TODO: ADD signed in and signed out classes to other HTML ELEMENTS for clarity!!!!!!
  if (!loggedIn) {
    $('.signedOut').show()
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
  signInFailure,
  signOutFailure,
  signOutSuccess,
  openPWChange,
  changePasswordFailure,
  changePasswordSuccess
}
