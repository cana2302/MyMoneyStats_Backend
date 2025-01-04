/*  
  ---- Modulo 'models' -----
  Es un modulo dedicado a definir solo el esquema Mongoose para las 'bills' 
*/
const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
  category: String,
  description: String,
  number: String,
});

billSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
});


module.exports = mongoose.model('Bill', billSchema)