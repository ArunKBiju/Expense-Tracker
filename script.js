document.addEventListener('DOMContentLoaded', function() {
    // Menu toggle functionality
    var menuToggle = document.querySelector('.menu-toggle');
    var menu = document.querySelector('.menu');
    
    menuToggle.addEventListener('click', function() {
        menu.classList.toggle('active');
    });

    // Hide menu on outside click
    document.addEventListener('click', function(event) {
        if (!menu.contains(event.target) && event.target !== menuToggle) {
            menu.classList.remove('active');
        }
    });

    // Income page functionality
    var incomeForm = document.getElementById('income-form');
    var incomeHistory = document.getElementById('income-history');
    var totalIncome = document.getElementById('total-income');
    var incomeTransactions = [];
    var showMoreIncomeIndex = 5;

    incomeForm.addEventListener('submit', function(event) {
        event.preventDefault();

        var source = document.getElementById('source').value;
        var amount = parseFloat(document.getElementById('amount').value);

        var incomeTransaction = { source: source, amount: amount };
        incomeTransactions.unshift(incomeTransaction);

        updateTotalIncome();
        updateIncomeHistory();

        document.getElementById('source').value = '';
        document.getElementById('amount').value = '';
    });

    function updateTotalIncome() {
        var currentTotalIncome = incomeTransactions.reduce(function(acc, transaction) {
            return acc + transaction.amount;
        }, 0);
        totalIncome.textContent = '₹' + currentTotalIncome.toFixed(2);
    }

    function updateIncomeHistory() {
        incomeHistory.innerHTML = '';

        var lastIncomeTransactions = incomeTransactions.slice(0, showMoreIncomeIndex);

        lastIncomeTransactions.forEach(function(transaction) {
            var incomeEntry = document.createElement('li');
            incomeEntry.textContent = transaction.source + ' - ₹' + transaction.amount.toFixed(2);
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

    // Expense page functionality
    var expenseForm = document.getElementById('expense-form');
    var expenseHistory = document.getElementById('expense-history');
    var totalExpenses = document.getElementById('total-expenses');
    var expenseTransactions = [];
    var showMoreExpenseIndex = 5;

    expenseForm.addEventListener('submit', function(event) {
        event.preventDefault();

        var source = document.getElementById('source').value;
        var amount = parseFloat(document.getElementById('amount').value);

        var expenseTransaction = { source: source, amount: -amount }; // Note the negative sign
        expenseTransactions.unshift(expenseTransaction);

        updateTotalExpenses();
        updateExpenseHistory();

        document.getElementById('source').value = '';
        document.getElementById('amount').value = '';
    });

    function updateTotalExpenses() {
        var currentTotalExpenses = expenseTransactions.reduce(function(acc, transaction) {
            return acc + transaction.amount;
        }, 0);
        totalExpenses.textContent = '₹' + Math.abs(currentTotalExpenses).toFixed(2); // Use Math.abs to get the positive value
    }

    function updateExpenseHistory() {
        expenseHistory.innerHTML = '';

        var lastExpenseTransactions = expenseTransactions.slice(0, showMoreExpenseIndex);

        lastExpenseTransactions.forEach(function(transaction) {
            var expenseEntry = document.createElement('li');
            expenseEntry.textContent = transaction.source + ' - ₹' + Math.abs(transaction.amount).toFixed(2); // Use Math.abs to get the positive value
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

    // Initial updates
    updateTotalIncome();
    updateIncomeHistory();
    updateTotalExpenses();
    updateExpenseHistory();
});
