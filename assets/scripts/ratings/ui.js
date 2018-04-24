'use strict'

// const store = require('../store')
const showUserReviewsTemplate = require('../templates/user.handlebars')
const showEditingReviewsTemplate = require('../templates/review-editing.handlebars')
const showEditableReviewsTemplate = require('../templates/review-editable.handlebars')

// Display successful call
const successDisplay = (message) => {
  $('#success-message').html('')
  $('#success-message').fadeIn()
  $('#success-message').append(`<p>${message}</p>`)
  $('input[type="email"], input[type="password"]').val('')
  setTimeout(function () { $('#success-message').fadeOut() }, 2000)
}
// Display unsuccessful call
const failureDisplay = (message) => {
  $('#error-message').html('')
  $('#error-message').fadeIn()
  $('#error-message').append(`<p>${message}</p>`)
  setTimeout(function () { $('#error-message').fadeOut() }, 2000)
}

const createReviewSuccess = (data) => {
  console.log(data)
  console.log('Create Review success')
  successDisplay('Review added successfully!')
  const showNewReview = showEditableReviewsTemplate({ rating: data.movie_rating })
  console.log(showNewReview)
  $('.actual-reviews').prepend(showNewReview)
  $('input[type="email"], input[type="password"], input[type="text"], input[type="date"], input[type="number"], textarea').val('')
}

const createReviewFailure = () => {
  console.log('Create Review failed!')
  failureDisplay('Something went wrong submitting your review')
}

const updateReviewSuccess = (data) => {
  console.log('Create Review success')
  successDisplay('Review Successfully updated!')
  const showEditableReviewHtml = showEditableReviewsTemplate({ rating: data.movie_rating })
  $('.review#' + data.movie_rating.id).empty()
  $('.review#' + data.movie_rating.id).append(showEditableReviewHtml)
  console.log(data)
}

const updateReviewFailure = () => {
  console.log('Create Review failed!')
  failureDisplay('Something went wrong updating your review')
}

const showReviewSuccess = (data) => {
  successDisplay('Review Successfully shown!')
  // console.log(data)
  const dataSorted = data.movie_ratings.sort(function (a, b) {
    return b.id - a.id
  })
  console.log(dataSorted)
  const showReviewsHtml = showUserReviewsTemplate({ ratings: data.movie_ratings })
  $('.col-md-12').append(showReviewsHtml)
}

const showReviewFailure = () => {
  failureDisplay('Something went wrong updating your review')
}
const editButtonClickSuccess = (data) => {
  console.log(data.movie_rating)
  console.log(showEditingReviewsTemplate)
  $('.review#' + data.movie_rating.id).empty()
  const showEditableReviewHtml = showEditingReviewsTemplate({ rating: data.movie_rating })
  setTimeout(function () {
    $('.review#' + data.movie_rating.id).append(showEditableReviewHtml)
  }, 0)
  successDisplay('Editing begun')
}

const deleteReviewSuccess = (data) => {
  successDisplay('Review Successfully Removed!')
  $('.review#' + data).fadeOut()
  console.log(data)
}

module.exports = {
  createReviewFailure,
  createReviewSuccess,
  updateReviewSuccess,
  updateReviewFailure,
  showReviewSuccess,
  showReviewFailure,
  editButtonClickSuccess,
  deleteReviewSuccess
}
