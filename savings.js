document.addEventListener('DOMContentLoaded', function() {
    var totalSavings = document.getElementById('total-savings');
    var savingsHistory = document.getElementById('savings-history');
    var showMoreButton = document.getElementById('show-more-savings');
    var incomeTransactions = JSON.parse(localStorage.getItem('incomeTransactions')) || [];
    var expenseTransactions = JSON.parse(localStorage.getItem('expenseTransactions')) || [];
    var allTransactions = incomeTransactions.concat(expenseTransactions);
    var totalIncome = parseFloat(localStorage.getItem('totalIncome')) || 0;
    var totalExpense = parseFloat(localStorage.getItem('totalExpense')) || 0;
    var totalSavingsAmount = totalIncome - totalExpense;

    totalSavings.textContent = totalSavingsAmount >= 1 ? '₹' + totalSavingsAmount.toFixed(2) : 'The expense is more than the income, which results in no savings';

    allTransactions.forEach(function(transaction) {
        var savingsEntry = document.createElement('li');
        var symbol = transaction.amount >= 0 ? '+' : '-';
        var color = transaction.amount >= 0 ? 'green' : 'red';
        savingsEntry.textContent = symbol + ' ₹' + Math.abs(transaction.amount).toFixed(2);
        savingsEntry.style.color = color;
        savingsHistory.appendChild(savingsEntry);
    });

    if (allTransactions.length > 5) {
        showMoreButton.style.display = 'block';
        showMoreButton.addEventListener('click', function() {
            for (var i = 5; i < Math.min(allTransactions.length, 10); i++) {
                var savingsEntry = document.createElement('li');
                var symbol = allTransactions[i].amount >= 0 ? '+' : '-';
                var color = allTransactions[i].amount >= 0 ? 'green' : 'red';
                savingsEntry.textContent = symbol + ' ₹' + Math.abs(allTransactions[i].amount).toFixed(2);
                savingsEntry.style.color = color;
                savingsHistory.appendChild(savingsEntry);
            }
            if (allTransactions.length <= 10) {
                showMoreButton.style.display = 'none';
            }
        });
    }
});
