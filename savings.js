document.addEventListener('DOMContentLoaded', function() {
    var totalSavings = document.getElementById('total-savings');
    var savingsHistory = document.getElementById('savings-history');
    var showMoreButton = document.getElementById('show-more');
    var allTransactions = [];
    var showMoreIndex = 5;

    // Calculate total savings
    var totalIncome = parseFloat(localStorage.getItem('totalIncome')) || 0;
    var totalExpense = parseFloat(localStorage.getItem('totalExpense')) || 0;
    var totalSavingsAmount = totalIncome - totalExpense;

    // Display total savings
    totalSavings.textContent = totalSavingsAmount >= 1 ? '₹' + totalSavingsAmount.toFixed(2) : 'The expense is more than the income, which results in no savings';

    // Get all transactions
    var incomeTransactions = JSON.parse(localStorage.getItem('incomeTransactions')) || [];
    var expenseTransactions = JSON.parse(localStorage.getItem('expenseTransactions')) || [];
    allTransactions = incomeTransactions.concat(expenseTransactions);

    // Display transaction history
    function updateTransactionHistory() {
        savingsHistory.innerHTML = '';

        var transactionsToShow = allTransactions.slice(0, showMoreIndex);
        transactionsToShow.forEach(function(transaction) {
            var symbol = transaction.type === 'income' ? '+' : '-';
            var color = transaction.type === 'income' ? 'green' : 'red';
            var transactionEntry = document.createElement('li');
            transactionEntry.textContent = symbol + ' ₹' + transaction.amount.toFixed(2);
            transactionEntry.style.color = color;
            savingsHistory.appendChild(transactionEntry);
        });

        if (allTransactions.length > showMoreIndex) {
            showMoreButton.style.display = 'block';
            showMoreButton.addEventListener('click', showMoreTransactions);
        } else {
            showMoreButton.style.display = 'none';
        }
    }

    function showMoreTransactions() {
        showMoreIndex += 5;
        updateTransactionHistory();
    }

    updateTransactionHistory();
});
