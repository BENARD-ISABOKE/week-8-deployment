const Expense = require('../models/Expense');
const User = require('../models/User');

// Add Expense
exports.addExpense = async (req, res) => {
  const { amount, date, category } = req.body;
  try {
    const user = await User.findByPk(req.user.id);
    if (user) {
      const expense = await Expense.create({ amount, date, category, user_id: user.id });
      res.status(201).json(expense);
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

// View Expenses
exports.viewExpenses = async (req, res) => {
  try {
    const expenses = await Expense.findAll({ where: { user_id: req.user.id } });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).send(error);
  }
};
