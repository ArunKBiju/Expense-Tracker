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

    // Dashboard button functionality
    var dashboardButton = document.getElementById('dashboard-button');
    dashboardButton.addEventListener('click', function() {
        // Your logic for the dashboard button
        alert('Dashboard button clicked!');
    });

    // About button functionality
    var aboutButton = document.getElementById('about-button');
    aboutButton.addEventListener('click', function() {
        // Your logic for the about button
        alert('About button clicked!');
    });

    // Contact button functionality
    var contactButton = document.getElementById('contact-button');
    contactButton.addEventListener('click', function() {
        // Your logic for the contact button
        alert('Contact button clicked!');
    });
});
