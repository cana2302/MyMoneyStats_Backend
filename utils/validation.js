/*
  ---- Modulo 'validation' -----
  Modulo para validar los input como user y password.
*/
const validationUsername = (username, response) => {
  if (username === null) {
    response.status(400).json({ error: 'username missing' })
    return false
  } else if (username.length<3) {
    response.status(400).json({ error: 'username must be at least 3 characters long' })
    return false
  } else if (typeof username !== 'string') {
    response.status(400).json({ error: 'username must be a string' })
    return false
  }
  return true
}

const validationPassword = (password, response) => {
  if (password === null) {
    response.status(400).json({ error: 'password missing' })
    return false
  } else if (password.length<4) {
    response.status(400).json({ error: 'password must be at least 4 characters long' })
    return false
  } else if (typeof password !== 'string') {
    response.status(400).json({ error: 'password must be a string' })
    return false
  }
  return true
}

const codeValidation = (AUTHORIZATION_CODE ,code, response) => {
  if (typeof code !== 'string'){
    response.status(400).json({ error: 'password must be a string' })
    return false
  } else if (code !== AUTHORIZATION_CODE){
    response.status(400).json({ error: 'wrong code' })
    return false
  }
  return true
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
  adminRoleValidation,
  codeValidation
}