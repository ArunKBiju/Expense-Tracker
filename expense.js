document.addEventListener('DOMContentLoaded', function() {
    var expenseForm = document.getElementById('expense-form');
    var expenseHistory = document.getElementById('expense-history');
    var totalExpense = document.getElementById('total-expense');
    var expenseTransactions = [];
    var showMoreExpenseIndex = 5;

    // Load transactions from localStorage
    if (localStorage.getItem('expenseTransactions')) {
        expenseTransactions = JSON.parse(localStorage.getItem('expenseTransactions'));
        updateTotalExpense();
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

        updateTotalExpense();
        updateExpenseHistory();

        document.getElementById('source').value = '';
        document.getElementById('amount').value = '';
    });

    // Add event listener for the "Clear All" button
    document.getElementById('clear-all').addEventListener('click', function() {
        if (confirm('Are you sure you want to clear all expenses?')) {
            expenseTransactions = [];
            localStorage.removeItem('expenseTransactions');
            updateTotalExpense();
            updateExpenseHistory();
        }
    });

    function updateTotalExpense() {
        var currentTotalExpense = expenseTransactions.reduce(function(acc, transaction) {
            return acc + transaction.amount;
        }, 0);
        totalExpense.textContent = currentTotalExpense.toFixed(2);

        // Update total expense in dashboard if available
        localStorage.setItem('totalExpense', currentTotalExpense.toFixed(2));
        var dashboardTotalExpenseElement = document.getElementById('total-expense-dashboard');
        if (dashboardTotalExpenseElement) {
            dashboardTotalExpenseElement.textContent = currentTotalExpense.toFixed(2);
        }
    }

    function updateExpenseHistory() {
        expenseHistory.innerHTML = '';

        var lastExpenseTransactions = expenseTransactions.slice(0, showMoreExpenseIndex);

        lastExpenseTransactions.forEach(function(transaction) {
            var expenseEntry = document.createElement('li');
            expenseEntry.textContent = '₹' + transaction.amount.toFixed(2) + ' - ' + transaction.source;
            expenseEntry.style.color = 'red'; // Ensure the text is in red color
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
