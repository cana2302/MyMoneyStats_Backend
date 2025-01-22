const { response } = require('../app')
const sessionRouter = require('express').Router()
const { tokenExtractor, userExtractor } = require('../utils/middleware');

// ----- GET -----
sessionRouter.get('/', tokenExtractor, userExtractor, async (request, response) => {
  if (request.user !== null) {                // verifica si hay token en la cookie
    const user = request.user        
    response.json(user)
  } else {
    console.log('request.user vacio!!!!')
    response.status(403).json({ error: 'request.user vacio!!!!' })
  }   
})

// ---- EXPORT  modulo ----
module.exports = sessionRouter

/*// ----- GET -----
sessionRouter.get('/', async (request, response) => {
  if (!request.user) {                                  // verifica si hay token en la cookie
    const checkUserInDb = await User.findById(request.user.id);   // verifica si aún existe ese usuario en DB
    if (!checkUserInDb) {
      const user = request.user         
      response.json(user)       // Si existe, devuelve json con: id, username, role
    } else {
      return response.status(404).json({ error: 'User not found' })
    }
  }
})
*/