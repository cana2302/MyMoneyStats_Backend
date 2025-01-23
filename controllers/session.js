const sessionRouter = require('express').Router()
const { tokenExtractor, userExtractor } = require('../utils/middleware');

// ----- GET -----
sessionRouter.get('/', async (request, response) => {
  if (request.user !== null) {                // verifica si hay token en la cookie
    const user = request.user        
    response.json(user)
  } else {
    response.status(401).json({ error: 'No token' })
  }   
})

// ---- EXPORT  modulo ----
module.exports = sessionRouter

/*
tokenExtractor, userExtractor,
*/