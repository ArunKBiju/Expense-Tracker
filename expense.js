document.addEventListener('DOMContentLoaded', function() {
    var expenseForm = document.getElementById('expense-form');
    var expenseHistory = document.getElementById('expense-history');
    var totalExpenses = document.getElementById('total-expenses');
    var expenseTransactions = [];
    var showMoreExpenseIndex = 5;

    // Load transactions from localStorage
    if (localStorage.getItem('expenseTransactions')) {
        expenseTransactions = JSON.parse(localStorage.getItem('expenseTransactions'));
        updateTotalExpenses();
        updateExpenseHistory();
    }

    expenseForm.addEventListener('submit', function(event) {
        event.preventDefault();

        var source = document.getElementById('source').value;
        var amount = parseFloat(document.getElementById('amount').value);

        var expenseTransaction = { source: source, amount: amount };
        expenseTransactions.unshift(expenseTransaction);

        // Save transactions to localStorage
        localStorage.setItem('expenseTransactions', JSON.stringify(expenseTransactions));

        updateTotalExpenses();
        updateExpenseHistory();

        document.getElementById('source').value = '';
        document.getElementById('amount').value = '';
    });

    function updateTotalExpenses() {
        var currentTotalExpenses = expenseTransactions.reduce(function(acc, transaction) {
            return acc + transaction.amount;
        }, 0);
        totalExpenses.textContent = currentTotalExpenses >= 0 ? '₹' + currentTotalExpenses.toFixed(2) : '-₹' + Math.abs(currentTotalExpenses).toFixed(2);
    }

    function updateExpenseHistory() {
        expenseHistory.innerHTML = '';

        var lastExpenseTransactions = expenseTransactions.slice(0, showMoreExpenseIndex);

        lastExpenseTransactions.forEach(function(transaction) {
            var expenseEntry = document.createElement('li');
            expenseEntry.textContent = transaction.source + ' - ₹' + transaction.amount.toFixed(2);
            expenseHistory.appendChild(expenseEntry);
        });

        if (expenseTransactions.length > showMoreExpenseIndex) {
            var showMoreExpenseButton = document.getElementById('show-more-expense');
            showMoreExpenseButton.style.display = 'block';
            showMoreExpenseButton.addEventListener('click', showMoreExpenseTransactions);
        }
    }

    function showMoreExpenseTransactions() {
        showMoreExpenseIndex += 5;
        updateExpenseHistory();
    }
});
