document.addEventListener('DOMContentLoaded', function() {
    var totalSavings = document.getElementById('total-savings');
    var savingsHistory = document.getElementById('savings-history');
    var showMoreButton = document.getElementById('show-more');
    
    var totalIncome = parseFloat(localStorage.getItem('totalIncome')) || 0;
    var totalExpense = parseFloat(localStorage.getItem('totalExpense')) || 0;
    var totalSavingsAmount = totalIncome - totalExpense;

    totalSavings.textContent = totalSavingsAmount >= 1 ? '₹' + totalSavingsAmount.toFixed(2) : 'You have no savings left';

    var transactions = JSON.parse(localStorage.getItem('incomeTransactions')) || [];
    transactions = transactions.concat(JSON.parse(localStorage.getItem('expenseTransactions')) || []);

    showTransactions(transactions);

    showMoreButton.addEventListener('click', function() {
        showTransactions(transactions);
    });

    function showTransactions(transactions) {
        savingsHistory.innerHTML = '';
        transactions.slice(-5).forEach(function(transaction) {
            var transactionEntry = document.createElement('li');
            transactionEntry.textContent = (transaction.amount >= 0 ? '+' : '-') + ' ₹' + Math.abs(transaction.amount.toFixed(2)) + ' - ' + transaction.source;
            transactionEntry.style.color = transaction.amount >= 0 ? 'green' : 'red';
            savingsHistory.appendChild(transactionEntry);
        });

        if (transactions.length > 5) {
            showMoreButton.style.display = 'block';
        } else {
            showMoreButton.style.display = 'none';
        }
    }
});
