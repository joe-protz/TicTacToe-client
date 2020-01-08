'use strict'

const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')

const onSignUp = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  $('#sign-in').trigger('reset')
  $('#sign-up').trigger('reset')
  $('form').trigger('reset')
  // sign up request
  api.signUp(data)
    // if sign up successful then make sign in request
    .then(response => {
      return api.signIn(data)
    })
    // if sign in successful then run signInSuccess
    .then(ui.signInSuccess)
    .catch(ui.signUpFailure)
}



const onSignIn = function (event) {

  event.preventDefault()
  const data = getFormFields(this)
  $('form').trigger('reset')
  api.signIn(data)
    .then(ui.signInSuccess)
    .catch(ui.signInFailure)
}
const onSignOut = function (event) {
  event.preventDefault()
  api.signOut()
    .then(ui.signOutSuccess)
    .catch(ui.signOutFailure)
}

const onChangePassword = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  api.changePassword(data)
    .then(ui.changePasswordSuccess)
    .catch(ui.changePasswordFailure)
}

const addHandlers = () => {
  $('#sign-up').on('submit', onSignUp)
  $('#sign-in').on('submit', onSignIn)
  $('#sign-out').on('click', onSignOut)
  $('#change-password-form').on('submit', onChangePassword)
  $('#change-password').on('click', ui.openPWChange)
  $('#cancel').on('click', ui.closePWChange)
}

module.exports = {
  addHandlers
}
