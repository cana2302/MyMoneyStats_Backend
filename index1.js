const express = require('express');
const app = express();
require('dotenv').config();

const Bill = require('./models/bill');

let bills = [];

app.use(express.static('dist'));

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
};

const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(requestLogger);

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
};

// ----- GET ------

// GET All bills
app.get('/api/bills', (request, response) => {
  Bill.find({}).then(bills => {
    response.json(bills)
  })
});

// GET specific ID bill
app.get('/api/bills/:id', (request, response, next) => {
  Bill.findById(request.params.id).then(bill => {
    response.json(bill)
  })

if (bill) {
    response.json(bill)
  } else {
    response.status(404).end()
  }
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

// ------ unknown endpoint --------
app.use(unknownEndpoint);

// ----- PORT -------
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})