document.addEventListener('DOMContentLoaded', function() {
    // Get the elements from the HTML
    var totalSavings = document.getElementById('total-savings');
    var savingsHistory = document.getElementById('savings-history');

    // Calculate total savings
    var totalIncome = parseFloat(localStorage.getItem('totalIncome')) || 0;
    var totalExpense = parseFloat(localStorage.getItem('totalExpense')) || 0;
    var totalSavingsAmount = totalIncome - totalExpense;

    // Display total savings or a message if the expense is more than the income
    if (totalSavingsAmount >= 1) {
        totalSavings.textContent = '₹' + totalSavingsAmount.toFixed(2);
    } else {
        totalSavings.textContent = 'The expense is more than the income, which results in no savings.';
    }

    // Get the last 5 transactions from both income and expense
    var incomeTransactions = JSON.parse(localStorage.getItem('incomeTransactions')) || [];
    var expenseTransactions = JSON.parse(localStorage.getItem('expenseTransactions')) || [];
    var allTransactions = incomeTransactions.concat(expenseTransactions);
    var lastTransactions = allTransactions.slice(-5);

    // Display transaction history with +/- symbols and colors
    savingsHistory.innerHTML = '';
    lastTransactions.forEach(function(transaction) {
        var symbol = transaction.amount >= 0 ? '+' : '-';
        var color = transaction.amount >= 0 ? 'green' : 'red';
        var savingsEntry = document.createElement('li');
        savingsEntry.textContent = symbol + ' ₹' + Math.abs(transaction.amount).toFixed(2) + ' - ' + transaction.source;
        savingsEntry.style.color = color;
        savingsHistory.appendChild(savingsEntry);
    });

    // Add 'Show More' button if there are more than 5 transactions
    if (allTransactions.length > 5) {
        var showMoreButton = document.createElement('button');
        showMoreButton.textContent = 'Show More';
        showMoreButton.addEventListener('click', function() {
            var additionalTransactions = allTransactions.slice(-(allTransactions.length - 5));
            additionalTransactions.forEach(function(transaction) {
                var symbol = transaction.amount >= 0 ? '+' : '-';
                var color = transaction.amount >= 0 ? 'green' : 'red';
                var savingsEntry = document.createElement('li');
                savingsEntry.textContent = symbol + ' ₹' + Math.abs(transaction.amount).toFixed(2) + ' - ' + transaction.source;
                savingsEntry.style.color = color;
                savingsHistory.appendChild(savingsEntry);
            });
            showMoreButton.style.display = 'none';
        });
        savingsHistory.appendChild(showMoreButton);
    }
});
