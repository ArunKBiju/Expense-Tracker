// Function to calculate total income
function calculateTotalIncome() {
    // Get all income amounts
    var incomeElements = document.querySelectorAll('.income-amount');
    var totalIncome = 0;
    incomeElements.forEach(function(element) {
        totalIncome += parseFloat(element.textContent.replace(/[^0-9.-]+/g,""));
    });
    return totalIncome;
}

// Function to update total income
function updateTotalIncome() {
    var totalIncome = calculateTotalIncome();
    document.getElementById('total-income').textContent = 'Total Income: ₹' + totalIncome.toFixed(2);
}

// Add income button click event
document.getElementById('add-income').addEventListener('click', function() {
    var source = document.getElementById('income-source').value.trim();
    var amount = parseFloat(document.getElementById('income-amount').value.trim());
    var frequency = document.getElementById('income-frequency').value.trim();

    // Validate inputs
    if (source === '' || isNaN(amount) || amount <= 0 || frequency === '') {
        alert('Please enter valid income details.');
        return;
    }

    // Add income to history
    var incomeHistory = document.getElementById('income-history');
    var newIncomeItem = document.createElement('li');
    newIncomeItem.innerHTML = source + ' - ₹' + amount.toFixed(2) + ' (' + frequency + ')' +
        '<button class="edit-income">Edit</button>' +
        '<button class="delete-income">Delete</button>';
    incomeHistory.appendChild(newIncomeItem);

    // Update total income
    updateTotalIncome();

    // Clear input fields
    document.getElementById('income-source').value = '';
    document.getElementById('income-amount').value = '';
    document.getElementById('income-frequency').value = 'Monthly';
});

// Edit income button click event
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('edit-income')) {
        var item = event.target.parentElement;
        var source = item.textContent.split(' - ')[0];
        var amount = parseFloat(item.textContent.split(' - ')[1].split(' ')[0].replace('₹', ''));
        var frequency = item.textContent.split('(')[1].split(')')[0];

        // Update input fields with existing data
        document.getElementById('income-source').value = source;
        document.getElementById('income-amount').value = amount;
        document.getElementById('income-frequency').value = frequency;

        // Delete the income item from history
        item.remove();

        // Update total income
        updateTotalIncome();
    }
});

// Delete income button click event
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-income')) {
        event.target.parentElement.remove();

        // Update total income
        updateTotalIncome();
    }
});

// Initial update of total income
updateTotalIncome();
