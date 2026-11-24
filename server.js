require('dotenv').config();

const express = require('express');
const expenseRoutes = require('./routes/expenseRoutes');

const app = express();

const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Expense routes
app.use('/expenses', expenseRoutes);

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});