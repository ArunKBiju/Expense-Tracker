// Update total income and savings whenever a new income is added
function updateTotalIncomeAndSavings() {
    updateTotalIncome();
    updateTotalSavings();
}

// Add new income transaction to the history
function addIncomeTransactionToHistory(transaction) {
    var incomeEntry = document.createElement('li');
    incomeEntry.textContent = transaction.source + ' - ₹' + transaction.amount.toFixed(2) + ' (Income)';
    incomeHistory.appendChild(incomeEntry);
}

// Add new expense transaction to the history
function addExpenseTransactionToHistory(transaction) {
    var expenseEntry = document.createElement('li');
    expenseEntry.textContent = transaction.source + ' - ₹' + transaction.amount.toFixed(2) + ' (Expense)';
    expenseHistory.appendChild(expenseEntry);
}

// Update income history and show the last 5 transactions
function updateIncomeHistory() {
    incomeHistory.innerHTML = '';
    var lastIncomeTransactions = incomeTransactions.slice(0, 5);
    lastIncomeTransactions.forEach(addIncomeTransactionToHistory);
}

// Update expense history and show the last 5 transactions
function updateExpenseHistory() {
    expenseHistory.innerHTML = '';
    var lastExpenseTransactions = expenseTransactions.slice(0, 5);
    lastExpenseTransactions.forEach(addExpenseTransactionToHistory);
}

// Update total income, savings, and income history
function updateIncome() {
    updateTotalIncomeAndSavings();
    updateIncomeHistory();
}

// Add event listener to income form
incomeForm.addEventListener('submit', function(event) {
    event.preventDefault();

    var source = document.getElementById('source').value;
    var amount = parseFloat(document.getElementById('amount').value);

    var incomeTransaction = { source: source, amount: amount };
    incomeTransactions.unshift(incomeTransaction);

    updateIncome();

    document.getElementById('source').value = '';
    document.getElementById('amount').value = '';
});

// Initialize income history and total income
updateTotalIncome();
updateIncomeHistory();
