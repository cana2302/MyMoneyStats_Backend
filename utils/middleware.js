/*
  ---- Modulo 'middleware' -----
  Importa el modulo 'logger' para realizar impresiones por consola
  Libreria JasonWebToken para poder generar Tokens
  Middleware personalizado
*/
const logger = require('./logger')
const config = require('../utils/config')
const jwt = require('jsonwebtoken')

// Registra por consola detalles de cada solicitud HTTP que llega al servidor (método, URL, el cuerpo)
const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

//------ unknown endpoint --------
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

//---- manejo de errores ------------
const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
    return response.status(400).json({ error: 'expected `username` to be unique' })
  } else if (error.name ===  'JsonWebTokenError') {
    return response.status(401).json({ error: 'token invalid' })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({ error: 'token expired' })
  } 
  next(error)
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  const cookies_access = request.cookies.access_token

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7); // Extrae el token después de 'Bearer '
  } else if (cookies_access !== null) {
    request.token = cookies_access // Extrae el token de las cookies
  } else if (authorization === null && cookies_access === null){
    request.token = null; // Si no hay token, asigna null
  }
  next();
}

const userExtractor = (request, response, next) => {
  const token = request.token
  
  if (token) {
    try {
      const decodedToken = jwt.verify(request.token, config.SECRET_JWT_KEY);
      request.user = {
        id: decodedToken.id.toString(), // Extrae el id user desde el token
        username: decodedToken.username ? decodedToken.username.toString() : null,
        role: decodedToken.role ? decodedToken.role.toString() : null
      }
    } catch (error) {
      return response.status(401).json({ error: 'Token inválido o expirado' }); // Maneja el error si el token no es válido
    }
  } else {
    request.user = null; // Si no hay token, asigna null
  }
  next();
}


module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}

/*
const userExtractor = (request, response, next) => {
  const token = request.token
  
  if (token) {
    const decodedToken = jwt.verify(request.token, config.SECRET_JWT_KEY)
    request.user = 
      {
        id: decodedToken.id.toString(), // Extrae el id user desde el token
        username: decodedToken.username ? decodedToken.username.toString() : null,
        role: decodedToken.role ? decodedToken.role.toString() : null
      }
  } else if (token === null){  
    request.user = null // Si no hay token, asigna null
  }
  next();
}

*/