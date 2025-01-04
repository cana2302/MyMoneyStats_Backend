/*
  ---- Modulo 'controllers' -----
  Modulo dedicado al control de eventos de rutas.
  Se crea el modulo y se exporta un objeto enrutador (billsRouter) que incluye todas las rutas
*/

const billsRouter = require('express').Router()
const Bill = require('../models/bill')

// ----- GET ------

// GET All bills
billsRouter.get('/', (request, response) => {
  Bill.find({}).then(bills => {
    response.json(bills)
  })
});

// GET specific ID bill
billsRouter.get('/:id', (request, response, next) => {
  Bill.findById(request.params.id)
  .then(bill => {
    if (bill) {
      response.json(bill)
    } else {
      response.status(404).end()
    }
  })
  .catch(error => next(error))
});

// GET Information & CurrentDate
billsRouter.get('/info', (request, response) => {
  Bill.find({}).then(bills => {
    const number = bills.length
    const currentDate = new Date(); // Si también quieres agregar la fecha actual, por ejemplo.
    
    response.send(
      `<p>My Money Stats has ${number} bills</p>
       <p>${currentDate}</p>`
    );
  })
});

// ----- POST --------
billsRouter.post('/', (request, response) => {
  const body = request.body;
 
  if (body.category === undefined || body.description === undefined || body.number === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }

  const bill = new Bill({
    category: body.category,
    description: body.description,
    number: body.number,
  });

  bill.save().then(savedBill => {
    response.json(savedBill)
  });
});

// ----- DELETE ------
billsRouter.delete('/:id', (request, response, next) => {
  Bill.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
});

// ---- EXPORT  modulo ----
module.exports = billsRouter