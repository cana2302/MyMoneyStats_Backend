const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.static('dist'));

app.use(cors());
app.use(express.json());

let bills = [
  { 
    "id": 1,
    "category": "Tax", 
    "description": "Cellphone",
    "number": "30"
  },
  { 
    "id": 2,
    "category": "Tax", 
    "description": "Rent",
    "number": "700"
  },
  { 
    "id": 3,
    "category": "Supermarket", 
    "description": "Carrefour",
    "number": "15"
  }
]

// ----- GET ------

// GET All bills
app.get('/api/bills', (request, response) => {
  response.json(bills)
});

// GET specific ID bill
app.get('/api/bills/:id', (request, response) => {
  const id = Number(request.params.id)
  const bill = bills.find(bill => bill.id === id)
  
  if (bill) {
    response.json(bill)
  } else {
    response.status(404).end()
  }
}); 

// GET Information & CurrentDate
app.get('/info', (request, response) => {
  const number = bills.length
  const currentDate = new Date(); // Si también quieres agregar la fecha actual, por ejemplo.
  
  response.send(
    `<p>My Money Stats has ${number} bills</p>
     <p>${currentDate}</p>`
  )
});

// ----- POST --------
const generateId = () => {
  return Math.floor(Math.random() * 1000000) + 1;
};

app.post('/api/bills', (request, response) => {
  const { category, description, number } = request.body;
 
  if (!category || !description || !number) {
    return response.status(400).json({ 
      error: 'content missing' 
    });
  }

  const bill = {
    id: generateId(),
    category: category,
    description: description,
    number: number,
  };

  bills = bills.concat(bill);
  response.json(bill);
});

// ----- PORT -------
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})