const bcryptjs = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('bills', { date: 1, category: 1, description: 1, amount: 1 })
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const { username, email, password } = request.body

  const checkUsername = await User.findOne({ username })

  if (!username || !password) {
    return response.status(400).json({ error: 'content missing' })
  } else if (username.length<3 || password.length<3) {
    return response.status(400).json({ error: ' must be at least 3 characters long' })
  } else if (checkUsername) {
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