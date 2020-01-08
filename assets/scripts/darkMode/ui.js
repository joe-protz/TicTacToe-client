'use strict'

const activateDarkMode = function ()  {
  $('body').css('background', 'rgb(45, 50, 57)')
  $('.board').removeClass('border-dark').addClass('border-secondary')
}
const activateLightMode = function () {
  $('body').css('background', '#D0E4FC')
  $('.board').addClass('border-dark').removeClass('border-secondary')
}
module.exports = {
  activateDarkMode,
  activateLightMode
}
