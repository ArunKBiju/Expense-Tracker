document.addEventListener('DOMContentLoaded', function() {
    var incomeForm = document.getElementById('income-form');
    var incomeHistory = document.getElementById('income-history');
    var totalIncome = document.getElementById('total-income');
    var transactions = []; // Array to store all transactions
    var showMoreIndex = 5; // Index to track the "Show More" functionality

    // Attach the event listener to the form's submit event
    incomeForm.addEventListener('submit', function(event) {
        event.preventDefault();

        var source = document.getElementById('source').value;
        var amount = parseFloat(document.getElementById('amount').value);

        // Create a transaction object and add it to the transactions array
        var transaction = { source: source, amount: amount };
        transactions.unshift(transaction); // Add to the beginning of the array

        // Update total income
        updateTotalIncome();

        // Update income history display
        updateIncomeHistory();

        // Clear input fields
        document.getElementById('source').value = '';
        document.getElementById('amount').value = '';
    });

    function updateTotalIncome() {
        var currentTotalIncome = transactions.reduce(function(acc, transaction) {
            return acc + transaction.amount;
        }, 0);
        totalIncome.textContent = '₹' + currentTotalIncome.toFixed(2);
    }

    function updateIncomeHistory() {
        incomeHistory.innerHTML = ''; // Clear existing history

        // Get the last 5 transactions or up to the showMoreIndex
        var lastTransactions = transactions.slice(0, showMoreIndex);

        // Create list items for each transaction and add to the history
        lastTransactions.forEach(function(transaction) {
            var incomeEntry = document.createElement('li');
            incomeEntry.textContent = transaction.source + ' - ₹' + transaction.amount.toFixed(2);
            incomeHistory.appendChild(incomeEntry);
        });

        // Add "Show More" button if there are more transactions to show
        if (transactions.length > showMoreIndex) {
            var showMoreButton = document.getElementById('show-more-income');
            showMoreButton.style.display = 'block';
            showMoreButton.addEventListener('click', showMoreTransactions);
        }
    }

    function showMoreTransactions() {
        // Increase the index to show the next set of transactions
        showMoreIndex += 5;
        updateIncomeHistory();
    }
});
