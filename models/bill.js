/*  
  ---- Modulo 'models' -----
  Es un modulo dedicado a definir solo el esquema Mongoose para las 'bills' 
*/
const mongoose = require('mongoose');

const amountValidator = function(amount) {
  const amountRegex = /^\d+(\.\d+)?$/
  return amountRegex.test(amount)
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
  number: {
    type: String,
    require: true,
    validate: {
      validator: amountValidator,
      message: props => `${props.value} is not a valid amount!`
    }
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