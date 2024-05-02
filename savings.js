document.addEventListener('DOMContentLoaded', function() {
    // Get the elements from the HTML
    var totalSavings = document.getElementById('total-savings');
    var savingsHistory = document.getElementById('savings-history');

    // Calculate total savings
    var totalIncome = parseFloat(localStorage.getItem('totalIncome')) || 0;
    var totalExpense = parseFloat(localStorage.getItem('totalExpense')) || 0;
    var totalSavingsAmount = totalIncome - totalExpense;

    // Display total savings
    if (totalSavingsAmount >= 1) {
        totalSavings.textContent = '₹' + totalSavingsAmount.toFixed(2);
    } else {
        totalSavings.textContent = 'The expense is more than the income, which results in no savings';
    }

    // Get the last 5 transactions from both income and expense
    var incomeTransactions = JSON.parse(localStorage.getItem('incomeTransactions')) || [];
    var expenseTransactions = JSON.parse(localStorage.getItem('expenseTransactions')) || [];
    var allTransactions = incomeTransactions.concat(expenseTransactions);
    var lastTransactions = allTransactions.slice(-5);

    // Display last 5 transactions
    savingsHistory.innerHTML = '';
    lastTransactions.forEach(function(transaction) {
        var savingsEntry = document.createElement('li');
        savingsEntry.textContent = transaction.source + ' - ₹' + transaction.amount.toFixed(2);
        savingsHistory.appendChild(savingsEntry);
    });
});
