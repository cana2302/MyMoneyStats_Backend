const { response } = require('../app')
const logoutRouter = require('express').Router()


// ----- POST ----
logoutRouter.post('/logout', (request, response) => {
  response
    .clearCookie('access_cokies')
    .json({message: 'Logout Succesful'})
})



// ---- EXPORT  modulo ----
module.exports = logoutRouter