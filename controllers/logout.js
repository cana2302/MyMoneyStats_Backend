const { response } = require('../app')
const logoutRouter = require('express').Router()

// ----- POST ----
logoutRouter.post('/', (request, response) => {
  response
    .clearCookie('access_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' // Mismo valor que cuando se creó la cookie
    })
    .json({message: 'Logout Succesful'})
})

// ---- EXPORT  modulo ----
module.exports = logoutRouter