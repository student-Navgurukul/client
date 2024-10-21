const express = require('express');
const Expense = require('../models/Expense');
const router = express.Router();



// Get all expenses
router.get('/', async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Add a new expense
router.post('/', async (req, res) => {
  const { amount, category, description } = req.body;
  try {
    const newExpense = new Expense({ amount, category, description });
    const savedExpense = await newExpense.save();
    res.json(savedExpense);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Update an expense
router.put('/:id', async (req, res) => {
  try {
    const expense = await Expense.findByIdUpdate(req.params.id, req.body, {new: true});
    if (!expense) return res.status(404).json({ msg: 'Expense not found' });
    res.json({ msg: 'Expense removed' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Delete an expense
router.delete('/:id', async (req, res) => {
  try {
    const expense = await Expense.findByIdDelete(req.params.id);
    if (!expense) return res.status(404).json({ msg: 'Expense not found' });
    res.json({ msg: 'Expense removed' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
