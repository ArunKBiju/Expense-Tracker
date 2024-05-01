document.addEventListener('DOMContentLoaded', function() {
    var savingsForm = document.getElementById('savings-form');
    var savingsHistory = document.getElementById('savings-history');
    var totalSavings = document.getElementById('total-savings');
    var savingsTransactions = [];
    var showMoreSavingsIndex = 5;

    savingsForm.addEventListener('submit', function(event) {
        event.preventDefault();

        var source = document.getElementById('source').value;
        var amount = parseFloat(document.getElementById('amount').value);

        var savingsTransaction = { source: source, amount: amount };
        savingsTransactions.unshift(savingsTransaction);

        updateTotalSavings();
        updateSavingsHistory();

        document.getElementById('source').value = '';
        document.getElementById('amount').value = '';
    });

    function updateTotalSavings() {
        var currentTotalSavings = savingsTransactions.reduce(function(acc, transaction) {
            return acc + transaction.amount;
        }, 0);
        totalSavings.textContent = '₹' + currentTotalSavings.toFixed(2);
    }

    function updateSavingsHistory() {
        savingsHistory.innerHTML = '';

        var lastSavingsTransactions = savingsTransactions.slice(0, showMoreSavingsIndex);

        lastSavingsTransactions.forEach(function(transaction) {
            var savingsEntry = document.createElement('li');
            savingsEntry.textContent = transaction.source + ' - ₹' + transaction.amount.toFixed(2);
            savingsHistory.appendChild(savingsEntry);
        });

        if (savingsTransactions.length > showMoreSavingsIndex) {
            var showMoreSavingsButton = document.getElementById('show-more-savings');
            showMoreSavingsButton.style.display = 'block';
            showMoreSavingsButton.addEventListener('click', showMoreSavingsTransactions);
        }
    }

    function showMoreSavingsTransactions() {
        showMoreSavingsIndex += 5;
        updateSavingsHistory();
    }
});
