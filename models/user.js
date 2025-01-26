const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, // esto asegura la unicidad de username
    lowercase: true,  // Almacena el username siempre en minúsculas
    trim: true,  // Elimina espacios en blanco alrededor del username
  },
  email: {
    type: String,
    trim: true,
    validate: {
      validator: function(v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); // Expresión regular básica para validar emails
      },
      message: props => `${props.value} invalid email`
    }
  },
  passwordHash: String,
  role: String,
  bills: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Bill'
    }
  ],
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // el passwordHash no debe mostrarse
    delete returnedObject.passwordHash
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User