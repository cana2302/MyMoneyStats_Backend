const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const loginRouter = require('express').Router()
const User = require('../models/user')
const validation = require('../utils/validation')
const config = require('../utils/config')

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body

  validation.validationUsername(username, response)
  validation.validationPassword(password, response)

  const user = await User.findOne({ username })

  const passwordCorrect = user === null
    ? false
    : await bcryptjs.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
    role: user.role
  }

  // el token expira in 60*60 segundos, eso es, en una hora
  const token = jwt.sign(userForToken, config.SECRET_JWT_KEY, { expiresIn: 60*60 })

  response
    .status(200)
    .cookie('access_token', token, {
      httpOnly:true, // la cookie solo se puede acceder en el servidor. No se va a poder leer desde el cliente
      secure: process.env.NODE_ENV === 'production',// si es produccion solo funciona con https
      sameSite: 'lax', // solo se puede acceder desde el mismo dominio, no se envia a otro dominio
      maxAge: 1000 * 60 * 60 // la cookie solo tiene validez 1 hora
    }) 
    .send({ token, username: user.username, id: user.id })
})

module.exports = loginRouter