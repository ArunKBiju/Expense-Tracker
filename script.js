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
    var addIncomeForm = document.getElementById('add-income-form');
    var incomeHistory = document.getElementById('income-history');
    var totalIncome = document.getElementById('total-income');

    addIncomeForm.addEventListener('submit', function(event) {
        event.preventDefault();

        var source = document.getElementById('income-source').value;
        var amount = parseFloat(document.getElementById('income-amount').value);

        // Add new income to history
        var incomeEntry = document.createElement('div');
        incomeEntry.textContent = source + ' - ' + amount;
        incomeHistory.appendChild(incomeEntry);

        // Update total income
        var currentTotalIncome = parseFloat(totalIncome.textContent);
        totalIncome.textContent = currentTotalIncome + amount;

        // Clear input fields
        document.getElementById('income-source').value = '';
        document.getElementById('income-amount').value = '';
    });

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
