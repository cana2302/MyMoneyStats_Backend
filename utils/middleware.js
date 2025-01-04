/*
  ---- Modulo 'middleware' -----
  Importa el modulo 'logger' para realizar impresiones por consola
  Middleware personalizado que cuenta con 3 funciones
*/
const logger = require('./logger')

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
  logger.error(error.message)

  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler
}