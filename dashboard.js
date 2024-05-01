document.addEventListener('DOMContentLoaded', function() {
    // Display user information
    var username = localStorage.getItem('username') || 'John Doe';
    var dob = localStorage.getItem('dob') || '01/01/1990';
    var email = localStorage.getItem('email') || 'john.doe@example.com';
    document.getElementById('username').textContent = username;
    document.getElementById('dob').textContent = dob;
    document.getElementById('email').textContent = email;

    // Display total income, total expense, and total savings
    var totalIncome = parseFloat(localStorage.getItem('totalIncome')) || 0;
    var totalExpense = parseFloat(localStorage.getItem('totalExpense')) || 0;
    var totalSavings = totalIncome - totalExpense;
    document.getElementById('total-income').textContent = '₹' + totalIncome.toFixed(2);
    document.getElementById('total-expense').textContent = '₹' + totalExpense.toFixed(2);
    document.getElementById('total-savings').textContent = '₹' + totalSavings.toFixed(2);
});

function logout() {
    // Clear user information from local storage
    localStorage.removeItem('username');
    localStorage.removeItem('dob');
    localStorage.removeItem('email');
    localStorage.removeItem('totalIncome');
    localStorage.removeItem('totalExpense');
    // Redirect to login page
    window.location.href = 'login.html';
}
