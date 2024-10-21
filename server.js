
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const expenseRoute = require('./routes/expense.js')
const app = express();

const PORT =  5000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '../server')));
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb+srv://poojasao23:pooja23@cluster0.cjqmx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/expenses', expenseRoute);

// Serve frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../server', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});