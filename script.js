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
    var addIncomeButton = document.getElementById('add-income');
    var incomeHistory = document.getElementById('income-history');
    var totalIncome = document.getElementById('total-income');
    var currentTotalIncome = 0;

    addIncomeButton.addEventListener('click', function(event) {
        event.preventDefault();

        var source = document.getElementById('source').value;
        var amount = parseFloat(document.getElementById('amount').value);

        // Add new income to history
        var incomeEntry = document.createElement('li');
        incomeEntry.textContent = source + ' - ₹' + amount.toFixed(2);
        incomeHistory.appendChild(incomeEntry);

        // Update total income
        currentTotalIncome += amount;
        totalIncome.textContent = '₹' + currentTotalIncome.toFixed(2);

        // Clear input fields
        document.getElementById('source').value = '';
        document.getElementById('amount').value = '';
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
