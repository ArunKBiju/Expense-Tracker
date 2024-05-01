addIncomeForm.addEventListener('submit', function(event) {
    event.preventDefault();

    var source = document.getElementById('source').value;
    var amount = parseFloat(document.getElementById('amount').value);

    // Add new income to history
    var incomeEntry = document.createElement('li');
    incomeEntry.textContent = source + ' - ₹ ' + amount;
    incomeHistory.appendChild(incomeEntry);

    // Update total income
    var currentTotalIncome = parseFloat(totalIncome.textContent);
    totalIncome.textContent = currentTotalIncome + amount;

    // Add income to transactions array
    transactions.push({ source: source, amount: amount });

    // Clear input fields
    document.getElementById('source').value = '';
    document.getElementById('amount').value = '';

    updateLastTransactions();
});
