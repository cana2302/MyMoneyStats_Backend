/*
  ---- Modulo 'validation' -----
  Modulo para validar los input como user y password.
*/
const validationUsername = (username, response) => {
  if (!username) {
    return response.status(400).json({ error: 'username missing' })
  } else if (username.length<3) {
    return response.status(400).json({ error: 'username must be at least 3 characters long' })
  } else if (typeof username !== 'string') {
    return response.status(400).json({ error: 'username must be a string' })
  }
}

const validationPassword = (password, response) => {
  if (!password) {
    return response.status(400).json({ error: 'password missing' })
  } else if (password.length<4) {
    return response.status(400).json({ error: 'password must be at least 4 characters long' })
  } else if (typeof password !== 'string') {
    return response.status(400).json({ error: 'password must be a string' })
  }
}

const adminRoleValidation = (user) => {
  if (user !== null){
    const userRole = user.role
    if (userRole !== 'admin') {
      return false
    } else if (userRole === 'admin') {
      return true
    }
  } else {
    return false
  }
}

module.exports = {
  validationUsername, 
  validationPassword,
  adminRoleValidation
}