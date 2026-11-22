require('dotenv').config();
const express = require('express');
const port = process.env.PORT;

const app = express();

// Array to be used for storing expenses
const expenses = [];

app.use(express.json());

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
