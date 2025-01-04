const express = require('express');
const app = express();
require('dotenv').config();

const Bill = require('./models/bill');

let bills = [];

app.use(express.static('dist'));

const cors = require('cors');
app.use(cors());
app.use(express.json());

// ----- GET ------

// GET All bills
app.get('/api/bills', (request, response) => {
  Bill.find({}).then(bills => {
    response.json(bills)
  })
});

// GET specific ID bill
app.get('/api/bills/:id', (request, response, next) => {
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
app.get('/info', (request, response) => {
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
app.post('/api/bills', (request, response) => {
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
app.delete('/api/bills/:id', (request, response, next) => {
  Bill.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
});


//------ unknown endpoint --------
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
};
// controlador de solicitudes con endpoint desconocido
app.use(unknownEndpoint);

//---- middleware de manejo de errores ------------
const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 
  next(error)
};
//--controlador de solicitudes que resulten en errores
app.use(errorHandler);


// ----- PORT -------
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})