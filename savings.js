document.addEventListener('DOMContentLoaded', function() {
    var totalSavings = document.getElementById('total-savings');
    var savingsHistory = document.getElementById('savings-history');

    var totalIncome = parseFloat(localStorage.getItem('totalIncome')) || 0;
    var totalExpense = parseFloat(localStorage.getItem('totalExpense')) || 0;
    var totalSavingsAmount = totalIncome - totalExpense;

    if (totalSavingsAmount >= 1) {
        totalSavings.textContent = '₹' + totalSavingsAmount.toFixed(2);
    } else {
        totalSavings.textContent = 'You have no savings left.';
    }

    var incomeTransactions = JSON.parse(localStorage.getItem('incomeTransactions')) || [];
    var expenseTransactions = JSON.parse(localStorage.getItem('expenseTransactions')) || [];
    var allTransactions = incomeTransactions.concat(expenseTransactions);
    var lastTransactions = allTransactions.slice(-5);

    savingsHistory.innerHTML = '';
    lastTransactions.forEach(function(transaction) {
        var savingsEntry = document.createElement('li');
        if (transaction.amount >= 0) {
            savingsEntry.textContent = '+ ₹' + transaction.amount.toFixed(2);
            savingsEntry.style.color = 'green';
        } else {
            savingsEntry.textContent = '- ₹' + Math.abs(transaction.amount).toFixed(2);
            savingsEntry.style.color = 'red';
        }
        savingsHistory.appendChild(savingsEntry);
    });

    if (allTransactions.length > 5) {
        document.getElementById('show-more').style.display = 'block';
        document.getElementById('show-more').addEventListener('click', function() {
            lastTransactions = allTransactions.slice(-(lastTransactions.length + 5));
            updateSavingsHistory();
        });
    }
});
