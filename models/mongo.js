// se ejecutó en la terminal: 'node mongo.js password'
// de forma única e inicial para crear la base de datos y probar la conexion

const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://cana2302:${password}@cluster0.d8fny.mongodb.net/myMoneyStatsApp?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const billSchema = new mongoose.Schema({
  date: String,
  category: String,
  description: String,
  amount: String,
})

const Bill = mongoose.model('Bill', billSchema)

const bill = new Bill({
  date:'2025-01-01',
  category: 'Food',
  description: 'Mexican Bar',
  amount: '25',
})

bill.save().then(result => {
  console.log('bill saved!')
  mongoose.connection.close()
})