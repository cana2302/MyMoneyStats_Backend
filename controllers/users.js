const bcryptjs = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')
const validation = require('../utils/validation')

usersRouter.get('/', async (request, response) => {
  const username = request.user.username
  if (username === null || username !== 'admin') {
    return response.status(403).json({ error: 'unauthorized user' })
  } else if (username === 'admin') {
    const users = await User.find({}).populate('bills', { date: 1, category: 1, description: 1, amount: 1 })
    response.json(users)
  }
})

usersRouter.post('/', async (request, response) => {
  const { username, email, password } = request.body

  validation.validationUsername(username, response)
  validation.validationPassword(password, response)

  const checkUsername = await User.findOne({ username })

  if (checkUsername) {
    return response.status(400).json({ error: 'username must be unique' })
  }

  const saltRounds = 10
  const passwordHash = await bcryptjs.hash(password, saltRounds)

  const user = new User({
    username, 
    email,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

module.exports = usersRouter