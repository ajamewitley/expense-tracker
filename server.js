require("dotenv").config();
const express = require("express");
const createPatchExpenseRouter = require("./routes/patchExpense.route");

const port = process.env.PORT;

const app = express();

// Array to be used for storing expenses
const expenses = [];

app.use(express.json());
app.use("/", createPatchExpenseRouter(expenses));

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
