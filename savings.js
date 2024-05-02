function updateSavingsHistory() {
    savingsHistory.innerHTML = '';

    var lastTransactions = allTransactions.slice(-5);

    lastTransactions.forEach(function(transaction) {
        var transactionEntry = document.createElement('li');
        var transactionText = document.createElement('span');
        var transactionAmount = document.createElement('span');

        transactionText.textContent = transaction.source + ' - ';
        transactionAmount.textContent = '₹' + Math.abs(transaction.amount).toFixed(2);
        transactionAmount.style.color = transaction.amount >= 0 ? 'green' : 'red';

        var symbol = transaction.amount >= 0 ? '+' : '-';
        transactionAmount.textContent = symbol + ' ' + transactionAmount.textContent.substring(1);

        transactionText.appendChild(transactionAmount);
        transactionEntry.appendChild(transactionText);
        savingsHistory.appendChild(transactionEntry);
    });

    if (allTransactions.length > 5) {
        var showMoreButton = document.getElementById('show-more');
        showMoreButton.style.display = 'block';
        showMoreButton.addEventListener('click', showMoreTransactions);
    }
}
