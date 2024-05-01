document.addEventListener('DOMContentLoaded', function() {
    var usernameElement = document.getElementById('username');
    var totalIncomeElement = document.getElementById('total-income');
    var totalExpenseElement = document.getElementById('total-expense');
    var totalSavingsElement = document.getElementById('total-savings');

    // Fetch and display username from local storage
    var username = localStorage.getItem('username');
    usernameElement.textContent = username ? username : '';

    // Fetch and display total income, expense, and savings from local storage
    var totalIncome = parseFloat(localStorage.getItem('totalIncome')) || 0;
    var totalExpense = parseFloat(localStorage.getItem('totalExpense')) || 0;
    var totalSavings = totalIncome - totalExpense;

    totalIncomeElement.textContent = totalIncome.toFixed(2);
    totalExpenseElement.textContent = totalExpense.toFixed(2);
    totalSavingsElement.textContent = totalSavings.toFixed(2);
});

function logout() {
    // Clear local storage and redirect to login page
    localStorage.clear();
    window.location.href = 'login.html';
}
