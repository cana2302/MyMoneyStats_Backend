/*
  ---- Modulo 'controllers' -----
  Modulo dedicado al control de eventos de rutas.
  Se crea el modulo y se exporta un objeto enrutador (billsRouter) que incluye todas las rutas
*/
const billsRouter = require('express').Router()
const Bill = require('../models/bill')
const User = require('../models/user')

// ----- GET ------

// GET All bills
billsRouter.get('/', async (request, response) => {
  const bills = await Bill.find({})    // .populate('user', { username: 1, email: 1 })
  response.json(bills)
})


// GET specific ID bill
billsRouter.get('/id/:id', async (request, response) => {
  const bill = await Bill.findById(request.params.id)
  if (bill) {
    response.json(bill)
  } else {
    response.status(404).end()
  }
})

// GET Information & CurrentDate
billsRouter.get('/info', async (request, response) => {
  const bills = await Bill.find({})
  const number_bills = bills.length
  const currentDate = new Date()

  response.send(
    `<p>My Money Stats has ${number_bills} bills</p>
     <p>${currentDate}</p>`
  )
})

// ----- POST --------
billsRouter.post('/', async (request, response) => {
  const body = request.body
  const userId = request.user.id

  if (!userId) {
    return response.status(401).json({ error: 'user invalid' })
  }
 
  if (body.date === undefined || body.category === undefined || body.description === undefined || body.amount === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }

  const user = await User.findById(userId)

  const bill = new Bill({
    date: body.date,
    category: body.category,
    description: body.description,
    amount: body.amount,
    user: user.id
  });

  const savedBill = await bill.save()
  user.bills = user.bills.concat(savedBill._id)
  await user.save()
  response.status(201).json(savedBill)
});

// ----- DELETE ID------
billsRouter.delete('/:id', async (request, response) => {
  const billId = request.params.id
  const bill = await Bill.findByIdAndDelete(billId)
  const idUserCreator = bill.user.toString()
  const idUserTryToDelete = request.user.id

  if (idUserCreator === idUserTryToDelete) {
    await Bill.findByIdAndDelete(billId)
    response.status(204).end()
  } else {
    response.status(403).json({ error: 'wrong token. invalid operation' })
  }
});

// ---- EXPORT  modulo ----
module.exports = billsRouter