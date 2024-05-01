document.addEventListener('DOMContentLoaded', function() {
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

    var expenseForm = document.getElementById('expense-form');
    var expenseHistory = document.getElementById('expense-history');
    var totalExpenses = document.getElementById('total-expenses');
    var expenseTransactions = [];
    var showMoreExpenseIndex = 5;

    expenseForm.addEventListener('submit', function(event) {
        event.preventDefault();

        var source = document.getElementById('source').value;
        var amount = parseFloat(document.getElementById('amount').value);

        var expenseTransaction = { source: source, amount: amount };
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
