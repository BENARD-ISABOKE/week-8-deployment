const express = require('express');
const { addExpense, viewExpenses } = require('../controllers/expenseController');
const router = express.Router();
const authenticate = require('../middleware/authenticate');

router.post('/add', authenticate, addExpense);
router.get('/view', authenticate, viewExpenses);

module.exports = router;
