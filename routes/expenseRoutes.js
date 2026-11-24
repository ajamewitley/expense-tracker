const express = require('express');

const router = express.Router();

const { getExpenses } = require('../controllers/expenseController');

// GET all expenses and filter expenses
router.get('/', getExpenses);  

module.exports = router;