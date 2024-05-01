document.addEventListener('DOMContentLoaded', function() {
    // Display username
    var username = localStorage.getItem('username') || 'User';
    document.getElementById('username').textContent = username;

    // Fetch total income, total expense, and total savings from local storage
    var totalIncome = parseFloat(localStorage.getItem('totalIncome')) || 0;
    var totalExpense = parseFloat(localStorage.getItem('totalExpense')) || 0;
    var totalSavings = parseFloat(localStorage.getItem('totalSavings')) || 0;

    // Display total income, total expense, and total savings
    document.getElementById('total-income').textContent = totalIncome.toFixed(2);
    document.getElementById('total-expense').textContent = totalExpense.toFixed(2);
    document.getElementById('total-savings').textContent = totalSavings.toFixed(2);

    // Logout button functionality
    document.getElementById('logout-button').addEventListener('click', function() {
        localStorage.removeItem('username');
        window.location.href = 'login.html';
    });
});
