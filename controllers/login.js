const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const loginRouter = require('express').Router()
const User = require('../models/user')
const validation = require('../utils/validation')

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
  const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: 60*60 })

  response
    .status(200)
    .send({ token, username: user.username, id: user.id })
})

module.exports = loginRouter