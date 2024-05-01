document.addEventListener('DOMContentLoaded', function() {
    var savingsHistory = document.getElementById('savings-history');
    var totalSavings = document.getElementById('total-savings');
    var showMoreSavingsIndex = 5;

    function updateTotalSavings() {
        var totalIncome = parseFloat(localStorage.getItem('totalIncome')) || 0;
        var totalExpense = parseFloat(localStorage.getItem('totalExpense')) || 0;
        var currentTotalSavings = totalIncome - totalExpense;
        totalSavings.textContent = '₹' + currentTotalSavings.toFixed(2);
    }

    function updateSavingsHistory() {
        savingsHistory.innerHTML = '';

        var allTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
        var lastSavingsTransactions = allTransactions.slice(0, showMoreSavingsIndex);

        lastSavingsTransactions.forEach(function(transaction) {
            var savingsEntry = document.createElement('li');
            savingsEntry.textContent = transaction.source + ' - ₹' + transaction.amount.toFixed(2);
            savingsHistory.appendChild(savingsEntry);
        });

        if (allTransactions.length > showMoreSavingsIndex) {
            var showMoreSavingsButton = document.getElementById('show-more-savings');
            showMoreSavingsButton.style.display = 'block';
            showMoreSavingsButton.addEventListener('click', showMoreSavingsTransactions);
        }
    }

    function showMoreSavingsTransactions() {
        showMoreSavingsIndex += 5;
        updateSavingsHistory();
    }

    updateTotalSavings();
    updateSavingsHistory();
});
