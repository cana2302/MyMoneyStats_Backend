const bcryptjs = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')
const validation = require('../utils/validation')
const config = require('../utils/config') //Importa el modulo config (contiene variables de entorno)


// ---- GET USERS (ONLY ADMIN)----
usersRouter.get('/', async (request, response) => {

  if (validation.adminRoleValidation(request.user)) {
    const users = await User.find({}).populate('bills', { date: 1, category: 1, description: 1, amount: 1 })
    response.json(users)
  } else {
    response.status(403).json({ error: 'unauthorized user' })
  }
})

// ---- POST NEW USERS ----
usersRouter.post('/', async (request, response) => {
  const { username, email, password, code } = request.body

  const AUTHORIZATION_CODE_ADMIN = config.AUTHORIZATION_CODE_ADMIN
  const AUTHORIZATION_CODE_USER = config.AUTHORIZATION_CODE_USER
  let userRole = ''

  validation.codeValidation(code, response)

  if (code === AUTHORIZATION_CODE_USER) {
    userRole = 'user'
  } else if (code === AUTHORIZATION_CODE_ADMIN) {
    userRole = 'admin'
  } else {
    return response.status(400).json({ error: 'invalid authorizaion code' })
  }
  
  validation.validationUsername(username, response)
  validation.validationPassword(password, response)
  
  const checkUsername = await User.findOne({ username })

  if (checkUsername) {
    return response.status(409).json({ error: 'username must be unique' })
  }

  const saltRounds = 10
  const passwordHash = await bcryptjs.hash(password, saltRounds)
  const role = userRole

  const user = new User({
    username, 
    email,
    passwordHash,
    role,
  })

  const savedUser = await user.save()
  response.status(201).json(savedUser)

})

// ---- DELETE USER ID (ONLY ADMIN) ----
usersRouter.delete('/:id', async (request, response) => {
  const userId = request.params.id

  if (validation.adminRoleValidation(request.user)) {
    await User.findByIdAndDelete(userId)
    response.status(204).end()
  } else {
    response.status(403).json({ error: 'wrong token. invalid operation' })
  }
})

module.exports = usersRouter