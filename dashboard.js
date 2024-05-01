document.addEventListener('DOMContentLoaded', function() {
    // Populate user info
    var usernameSpan = document.getElementById('username');
    var dobInput = document.getElementById('dob');
    var emailInput = document.getElementById('email');
    usernameSpan.textContent = localStorage.getItem('username') || 'username';
    dobInput.value = localStorage.getItem('dob') || 'xx/xx/xxxx';
    emailInput.value = localStorage.getItem('email') || 'abc@gmail.com';

    // Fetch and display total income, total expense, and total savings
    var totalIncome = parseFloat(localStorage.getItem('totalIncome')) || 0;
    var totalExpense = parseFloat(localStorage.getItem('totalExpense')) || 0;
    var totalSavings = totalIncome - totalExpense;

    document.getElementById('total-income').textContent = totalIncome.toFixed(2);
    document.getElementById('total-expense').textContent = totalExpense.toFixed(2);
    document.getElementById('total-savings').textContent = totalSavings >= 0 ? '₹' + totalSavings.toFixed(2) : '-₹' + Math.abs(totalSavings).toFixed(2);
});

function logout() {
    // Redirect to login.html
    window.location.href = 'login.html';
}
