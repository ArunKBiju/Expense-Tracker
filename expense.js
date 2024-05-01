// Update total expenses and savings whenever a new expense is added
function updateTotalExpensesAndSavings() {
    updateTotalExpenses();
    updateTotalSavings();
}

// Update expense history and show the last 5 transactions
function updateExpenseHistory() {
    expenseHistory.innerHTML = '';
    var lastExpenseTransactions = expenseTransactions.slice(0, 5);
    lastExpenseTransactions.forEach(addExpenseTransactionToHistory);
}

// Update total expenses, savings, and expense history
function updateExpense() {
    updateTotalExpensesAndSavings();
    updateExpenseHistory();
}

// Add event listener to expense form
expenseForm.addEventListener('submit', function(event) {
    event.preventDefault();

    var source = document.getElementById('source').value;
    var amount = parseFloat(document.getElementById('amount').value);

    var expenseTransaction = { source: source, amount: amount };
    expenseTransactions.unshift(expenseTransaction);

    updateExpense();

    document.getElementById('source').value = '';
    document.getElementById('amount').value = '';
});

// Initialize expense history and total expenses
updateTotalExpenses();
updateExpenseHistory();
