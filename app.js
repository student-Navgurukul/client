// const expenseForm = document.getElementById('expense-form');
// const expenseList = document.getElementById('expense-list');
// const totalCostDisplay = document.getElementById('total-cost');

// let totalCost = 0;
// let expenses = []; // Load expenses from MongoDB
// let isEditing = false;
// let currentExpenseId = null;

// // Fetch expenses from backend on page load
// document.addEventListener('DOMContentLoaded', async () => {
//     const response = await fetch('/api/expenses');
//     expenses = await response.json();
//     renderExpenseList();
// });

// // Add event listener to form submit
// expenseForm.addEventListener('submit', async (e) => {
//     e.preventDefault();

//     const description = document.getElementById('description').value;
//     const amount = parseFloat(document.getElementById('amount').value);
//     const category = document.getElementById('category').value;

//     if (isEditing && currentExpenseId) {
//         // Find the original expense to update the total cost correctly
//         const originalExpense = expenses.find(expense => expense._id === currentExpenseId);

//         // Update the existing expense in MongoDB
//         const response = await fetch(`/api/expenses/${currentExpenseId}`, {
//             method: 'PUT',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ description, amount, category })
//         });

//         const updatedExpense = await response.json();
        
//         // Update the expenses array
//         expenses = expenses.map(expense => expense._id === currentExpenseId ? updatedExpense : expense);

//         // Update totalCost by removing the original amount and adding the new one
//         totalCost = totalCost - originalExpense.amount + updatedExpense.amount;
//         updateTotalCost();

//         isEditing = false;  // Exit edit mode
//         currentExpenseId = null;
//         expenseForm.reset();  // Clear form
//         renderExpenseList();  // Re-render the expense list
//         return;
//     }

//     // Create a new expense in MongoDB
//     const response = await fetch('/api/expenses', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ description, amount, category })
//     });

//     const newExpense = await response.json();
//     expenses.push(newExpense);

//     totalCost += amount;
//     updateTotalCost();
//     renderExpenseList();
//     expenseForm.reset();
// });

// // Render the list of expenses
// function renderExpenseList() {
//     expenseList.innerHTML = ''; // Clear the existing list
//     totalCost = 0; // Reset the total cost

//     expenses.forEach((expense, index) => {
//         addExpenseToList(expense, index); // Re-add each expense
//         totalCost += expense.amount; // Recalculate total cost
//     });

//     updateTotalCost();
// }

// // Add an expense to the list
// function addExpenseToList(expense, index) {
//     const li = document.createElement('li');
//     li.innerHTML = `${expense.description} (${expense.category}): $${expense.amount.toFixed(2)}`;

//     // Create Edit button
//     const editBtn = document.createElement('button');
//     editBtn.textContent = 'Edit';
//     editBtn.classList.add('edit-btn');
//     editBtn.addEventListener('click', () => editExpense(expense._id)); // Attach event listener

//     // Create Delete button
//     const deleteBtn = document.createElement('button');
//     deleteBtn.textContent = 'Delete';
//     deleteBtn.classList.add('delete-btn');
//     deleteBtn.addEventListener('click', () => deleteExpense(expense._id)); // Attach event listener

//     li.appendChild(editBtn);
//     li.appendChild(deleteBtn);

//     expenseList.appendChild(li);
// }

// // Update the total cost display
// function updateTotalCost() {
//     totalCostDisplay.textContent = `Total: $${totalCost.toFixed(2)}`;
// }

// // Delete an expense
// async function deleteExpense(id) {
//     await fetch(`/api/expenses/${id}`, { method: 'DELETE' });

//     expenses = expenses.filter(expense => expense._id !== id);
//     renderExpenseList();
// }

// // Edit an expense using prompt
// async function editExpense(id) {
//     const expense = expenses.find(expense => expense._id === id);

//     // Prompt user for new values
//     const newDescription = prompt("Enter new description:", expense.description);
//     const newAmount = parseFloat(prompt("Enter new amount:", expense.amount));
//     const newCategory = prompt("Enter new category:", expense.category);

//     if (!newDescription || isNaN(newAmount) || !newCategory) {
//         alert('Invalid input. Please provide valid data.');
//         return;
//     }

//     // Update the existing expense in MongoDB
//     const response = await fetch(`/api/expenses/${id}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ description: newDescription, amount: newAmount, category: newCategory })
//     });

//     const updatedExpense = await response.json();
    
//     // Update the expenses array
//     expenses = expenses.map(expense => expense._id === id ? updatedExpense : expense);

//     // Update total cost
//     totalCost = totalCost - expense.amount + newAmount;
//     updateTotalCost();

//     renderExpenseList();
// }



const expenseForm = document.getElementById('expense-form');
const expenseList = document.getElementById('expense-list');
const totalCostDisplay = document.getElementById('total-cost');

let totalCost = 0;
let expenses = []; // Load expenses from MongoDB
let isEditing = false;
let currentExpenseId = null;

// Fetch expenses from backend on page load
document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch('/api/expenses');
    expenses = await response.json();
    renderExpenseList();
});

// Add event listener to form submit
expenseForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const category = document.getElementById('category').value;

    if (isEditing && currentExpenseId) {
        // Find the original expense to update the total cost correctly
        const originalExpense = expenses.find(expense => expense._id === currentExpenseId);

        // Update the existing expense in MongoDB
        const response = await fetch(`/api/expenses/${currentExpenseId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ description, amount, category })
        });

        const updatedExpense = await response.json();
        
        // Update the expenses array
        expenses = expenses.map(expense => expense._id === currentExpenseId ? updatedExpense : expense);

        // Update totalCost by removing the original amount and adding the new one
        totalCost = totalCost - originalExpense.amount + updatedExpense.amount;
        updateTotalCost();

        isEditing = false;  // Exit edit mode
        currentExpenseId = null;
        expenseForm.reset();  // Clear form
        renderExpenseList();  // Re-render the expense list
        return;
    }

    // Create a new expense in MongoDB
    const response = await fetch('/api/expenses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description, amount, category })
    });

    const newExpense = await response.json();
    expenses.push(newExpense);

    totalCost += amount;
    updateTotalCost();
    renderExpenseList();
    expenseForm.reset();
});

// Render the list of expenses
function renderExpenseList() {
    expenseList.innerHTML = ''; // Clear the existing list
    totalCost = 0; // Reset the total cost

    expenses.forEach((expense, index) => {
        addExpenseToList(expense, index); // Re-add each expense
        totalCost += expense.amount; // Recalculate total cost
    });

    updateTotalCost();
}

// Add an expense to the list
function addExpenseToList(expense, index) {
    const li = document.createElement('li');
    li.innerHTML = `${expense.description} (${expense.category}): $${expense.amount.toFixed(2)}`;

    // Create Edit button
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.classList.add('edit-btn');
    editBtn.addEventListener('click', () => editExpense(expense._id)); // Attach event listener

    // Create Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', () => deleteExpense(expense._id)); // Attach event listener

    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    expenseList.appendChild(li);
}

// Update the total cost display
function updateTotalCost() {
    totalCostDisplay.textContent = `Total: $${totalCost.toFixed(2)}`;
}

// Delete an expense
async function deleteExpense(id) {
    await fetch(`/api/expenses/${id}`, { method: 'DELETE' });

    expenses = expenses.filter(expense => expense._id !== id);
    renderExpenseList();
}

// Edit an expense using prompt
async function editExpense(id) {
    const expense = expenses.find(expense => expense._id === id);

    // Prompt user for new values
    const newDescription = prompt("Enter new description:", expense.description);
    const newAmount = parseFloat(prompt("Enter new amount:", expense.amount));
    const newCategory = prompt("Enter new category:", expense.category);

    if (!newDescription || isNaN(newAmount) || !newCategory) {
        alert('Invalid input. Please provide valid data.');
        return;
    }

    // Update the existing expense in MongoDB
    const response = await fetch(`/api/expenses/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description: newDescription, amount: newAmount, category: newCategory })
    });

    const updatedExpense = await response.json();
    
    // Update the expenses array
    expenses = expenses.map(expense => expense._id === id ? updatedExpense : expense);

    // Update total cost
    totalCost = totalCost - expense.amount + newAmount;
    updateTotalCost();

    renderExpenseList();
}





