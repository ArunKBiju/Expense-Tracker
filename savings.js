// Calculate total savings based on total income and total expenses
function calculateTotalSavings() {
    var currentTotalIncome = incomeTransactions.reduce(function(acc, transaction) {
        return acc + transaction.amount;
    }, 0);
    
    var currentTotalExpenses = expenseTransactions.reduce(function(acc, transaction) {
        return acc + transaction.amount;
    }, 0);

    return currentTotalIncome - currentTotalExpenses;
}

// Update total savings
function updateTotalSavings() {
    totalSavings.textContent = '₹' + calculateTotalSavings().toFixed(2);
}

// Update savings history and show the last 5 transactions
function updateSavingsHistory() {
    savingsHistory.innerHTML = '';
    var lastTransactions = [...incomeTransactions, ...expenseTransactions].slice(0, 5);

    lastTransactions.forEach(function(transaction) {
        var savingsEntry = document.createElement('li');
        savingsEntry.textContent = transaction.source + ' - ₹' + transaction.amount.toFixed(2) + (transaction in incomeTransactions ? ' (Income)' : ' (Expense)');
        savingsHistory.appendChild(savingsEntry);
    });
}

// Update total savings and savings history
function updateSavings() {
    updateTotalSavings();
    updateSavingsHistory();
}

// Initialize savings history and total savings
updateTotalSavings();
updateSavingsHistory();
