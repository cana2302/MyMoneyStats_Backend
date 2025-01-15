/*  
  ---- Modulo 'models' -----
  Es un modulo dedicado a definir solo el esquema Mongoose para las 'bills' 
*/
const mongoose = require('mongoose');

const amountValidator = function(amount_) {
  const amountRegex = /^\d+(\.\d+)?$/
  return amountRegex.test(amount_)
}

const billSchema = new mongoose.Schema({
  date: {
    type: String,
    require: true
  },
  category: {
    type: String,
    minLength: 3,
    require: true
  },
  description: String,
  amount: {
    type: String,
    require: true,
    validate: {
      validator: amountValidator,
      message: props => `${props.value} is not a valid amount!`
    }
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

billSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
});


module.exports = mongoose.model('Bill', billSchema)