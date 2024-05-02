document.addEventListener('DOMContentLoaded', function() {
    var usernameElement = document.getElementById('username');
    var totalIncomeElement = document.getElementById('total-income');
    var totalExpenseElement = document.getElementById('total-expense');
    var totalSavingsElement = document.getElementById('total-savings');

    // Load user information from localStorage
    var username = localStorage.getItem('username');
    var totalIncome = parseFloat(localStorage.getItem('totalIncome')) || 0;
    var totalExpense = parseFloat(localStorage.getItem('totalExpense')) || 0;
    var totalSavings = parseFloat(localStorage.getItem('totalSavings')) || 0;

    // Display user information
    usernameElement.textContent = username;
    totalIncomeElement.textContent = totalIncome.toFixed(2);
    totalExpenseElement.textContent = totalExpense.toFixed(2);
    totalSavingsElement.textContent = totalSavings.toFixed(2);

    // Logout button
    console.log('Adding event listener for logout button...');
    document.getElementById('logout').addEventListener('click', function() {
        console.log('Logout button clicked');
        window.location.href = 'index.html';
    });

    // Delete account button
    console.log('Adding event listener for delete account button...');
    document.getElementById('delete-account').addEventListener('click', function() {
        console.log('Delete account button clicked');
        if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            // Clear all user data
            localStorage.clear();
            // Redirect to index.html
            window.location.href = 'index.html';
        }
    });
});
