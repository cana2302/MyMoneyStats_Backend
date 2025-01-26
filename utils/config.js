/*
  ---- Modulo 'config' ----
  Modulo que exporta las variables de entorno
*/
require('dotenv').config()

const PORT = process.env.PORT

const MONGODB_URI = process.env.NODE_ENV === 'test' 
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI

const SECRET_JWT_KEY = process.env.SECRET_JWT_KEY

const AUTHORIZATION_CODE = process.env.AUTHORIZATION_CODE

module.exports = {
  MONGODB_URI,
  PORT,
  SECRET_JWT_KEY,
  AUTHORIZATION_CODE
}