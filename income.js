document.addEventListener('DOMContentLoaded', function() {
    var incomeForm = document.getElementById('income-form');
    var incomeHistory = document.getElementById('income-history');
    var totalIncome = document.getElementById('total-income');
    var incomeTransactions = [];
    var showMoreIncomeIndex = 5;

    // Load transactions from localStorage
    if (localStorage.getItem('incomeTransactions')) {
        incomeTransactions = JSON.parse(localStorage.getItem('incomeTransactions'));
        updateTotalIncome();
        updateIncomeHistory();
    }

    incomeForm.addEventListener('submit', function(event) {
        event.preventDefault();

        var source = document.getElementById('source').value;
        var amount = parseFloat(document.getElementById('amount').value);

        var incomeTransaction = { source: source, amount: amount };
        incomeTransactions.unshift(incomeTransaction);

        // Save transactions to localStorage
        localStorage.setItem('incomeTransactions', JSON.stringify(incomeTransactions));

        updateTotalIncome();
        updateIncomeHistory();

        document.getElementById('source').value = '';
        document.getElementById('amount').value = '';
    });

    // Add event listener for the "Clear All" button
    document.getElementById('clear-all').addEventListener('click', function() {
        if (confirm('Are you sure you want to clear all income?')) {
            incomeTransactions = [];
            localStorage.removeItem('incomeTransactions');
            updateTotalIncome();
            updateIncomeHistory();
        }
    });

    function updateTotalIncome() {
        var currentTotalIncome = incomeTransactions.reduce(function(acc, transaction) {
            return acc + transaction.amount;
        }, 0);
        totalIncome.textContent = currentTotalIncome.toFixed(2);

        // Update total income in dashboard if available
        localStorage.setItem('totalIncome', currentTotalIncome.toFixed(2));
        var dashboardTotalIncomeElement = document.getElementById('total-income-dashboard');
        if (dashboardTotalIncomeElement) {
            dashboardTotalIncomeElement.textContent = currentTotalIncome.toFixed(2);
        }
    }

    function updateIncomeHistory() {
        incomeHistory.innerHTML = '';

        var lastIncomeTransactions = incomeTransactions.slice(0, showMoreIncomeIndex);

        lastIncomeTransactions.forEach(function(transaction) {
            var incomeEntry = document.createElement('li');
            incomeEntry.textContent = '+ ₹' + transaction.amount.toFixed(2) + ' - ' + transaction.source;
            incomeHistory.appendChild(incomeEntry);
        });

        if (incomeTransactions.length > showMoreIncomeIndex) {
            var showMoreIncomeButton = document.getElementById('show-more-income');
            showMoreIncomeButton.style.display = 'block';
            showMoreIncomeButton.addEventListener('click', showMoreIncomeTransactions);
        }
    }

    function showMoreIncomeTransactions() {
        showMoreIncomeIndex += 5;
        updateIncomeHistory();
    }
});
