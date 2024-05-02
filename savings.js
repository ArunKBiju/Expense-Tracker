document.addEventListener('DOMContentLoaded', function() {
    var totalSavings = document.getElementById('total-savings');
    var savingsHistory = document.getElementById('savings-history');

    var totalIncome = parseFloat(localStorage.getItem('totalIncome')) || 0;
    var totalExpense = parseFloat(localStorage.getItem('totalExpense')) || 0;
    var totalSavingsAmount = totalIncome - totalExpense;

    if (totalSavingsAmount >= 1) {
        totalSavings.textContent = '₹' + totalSavingsAmount.toFixed(2);
    } else {
        totalSavings.textContent = 'The expense is more than the income, which results in no savings';
    }

    var incomeTransactions = JSON.parse(localStorage.getItem('incomeTransactions')) || [];
    var expenseTransactions = JSON.parse(localStorage.getItem('expenseTransactions')) || [];
    var allTransactions = incomeTransactions.concat(expenseTransactions);

    allTransactions.forEach(function(transaction) {
        var transactionEntry = document.createElement('li');
        transactionEntry.textContent = (transaction.amount >= 0 ? '+' : '-') + ' ₹' + Math.abs(transaction.amount).toFixed(2) + ' ' + transaction.source;
        transactionEntry.classList.add(transaction.amount >= 0 ? 'income' : 'expense');
        savingsHistory.appendChild(transactionEntry);
    });
});
