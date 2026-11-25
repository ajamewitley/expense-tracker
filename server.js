require("dotenv").config();
const express = require("express");
const createPatchExpenseRouter = require("./routes/patchExpense.route");

const port = process.env.PORT;

const app = express();

// Array to be used for storing expenses
const expenses = [
  {
    id: 1,
    amount: 3000,
    category: 'food',
    note: 'coffee and bread',
    createdAt: '23/11/2026, 21:10:28',
    updatedAt: '23/11/2026, 21:10:28'
  },
  {
    id: 2,
    amount: 4500,
    category: 'food',
    note: 'coffee and bread',
    createdAt: '23/11/2026, 21:10:28',
    updatedAt: '23/11/2026, 21:10:28'
  },
  {
    id: 3,
    amount: 5000,
    category: 'food',
    note: 'coffee and bread',
    createdAt: '23/11/2026, 21:10:28',
    updatedAt: '23/11/2026, 21:10:28'
  },
  {
    id: 4,
    amount: 3500,
    category: 'food',
    note: 'coffee and bread',
    createdAt: '23/11/2026, 21:10:28',
    updatedAt: '23/11/2026, 21:10:28'
  },
  {
    id: 5,
    amount: 2000,
    category: 'food',
    note: 'coffee and bread',
    createdAt: '23/11/2026, 21:10:28',
    updatedAt: '23/11/2026, 21:10:28'
  }
];

app.use(express.json());
app.use("/", createPatchExpenseRouter(expenses));

// Endpoint for getting one expense
app.get('/expenses/:id', (req, res) => {
  const id = parseInt(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({error: 'id must be a number'});
  }

  const expense = expenses.find((e) => e.id === id);
  if (!expense) {
    return res.status(404).json({error: 'expense not found'});
  }

  res.status(200).json(expense);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
