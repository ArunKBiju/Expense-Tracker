document.addEventListener('DOMContentLoaded', function() {
    // Fetch username from local storage and display
    var username = localStorage.getItem('username');
    document.getElementById('username').textContent = username;

    // Fetch total income, total expense, and total savings from local storage and display
    var totalIncome = parseFloat(localStorage.getItem('totalIncome')) || 0;
    var totalExpense = parseFloat(localStorage.getItem('totalExpense')) || 0;
    var totalSavings = totalIncome - totalExpense;
    document.getElementById('total-income').textContent = '₹' + totalIncome.toFixed(2);
    document.getElementById('total-expense').textContent = '₹' + totalExpense.toFixed(2);
    document.getElementById('total-savings').textContent = '₹' + totalSavings.toFixed(2);
});

function logout() {
    // Remove username from local storage and redirect to index.html
    localStorage.removeItem('username');
    window.location.href = 'index.html';
}
