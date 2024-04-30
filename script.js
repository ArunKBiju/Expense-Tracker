// Load existing income data from local storage
let incomeData = localStorage.getItem('incomeData');
if (!incomeData) {
    incomeData = [];
} else {
    incomeData = JSON.parse(incomeData);
}

// Calculate and display total income till now
let totalIncome = incomeData.reduce((total, income) => total + parseInt(income.amount), 0);
document.getElementById('total-income').textContent = totalIncome;

// Add income form submission
document.getElementById('income-form').addEventListener('submit', function(event) {
    event.preventDefault();
    let source = document.getElementById('source').value.trim();
    let amount = document.getElementById('amount').value.trim();
    let frequency = document.getElementById('frequency').value;
    
    if (source === '' || amount === '') {
        alert('Please fill in all fields');
        return;
    }
    
    let incomeItem = {
        source: source,
        amount: amount,
        frequency: frequency
    };
    
    incomeData.push(incomeItem);
    localStorage.setItem('incomeData', JSON.stringify(incomeData));
    
    // Recalculate and update total income
    totalIncome += parseInt(amount);
    document.getElementById('total-income').textContent = totalIncome;
    
    // Clear form fields
    document.getElementById('source').value = '';
    document.getElementById('amount').value = '';
});

// Display income history
let incomeHistory = document.getElementById('income-history');
for (let i = 0; i < Math.min(10, incomeData.length); i++) {
    let income = incomeData[incomeData.length - 1 - i];
    let item = document.createElement('li');
    item.textContent = `${income.source}: ₹${income.amount} (${income.frequency})`;
    incomeHistory.appendChild(item);
}

// Show more income history
let moreBtn = document.getElementById('more-btn');
let count = 10;
moreBtn.addEventListener('click', function() {
    for (let i = count; i < Math.min(count + 10, incomeData.length); i++) {
        let income = incomeData[incomeData.length - 1 - i];
        let item = document.createElement('li');
        item.textContent = `${income.source}: ₹${income.amount} (${income.frequency})`;
        incomeHistory.appendChild(item);
    }
    count += 10;
    if (count >= incomeData.length) {
        moreBtn.style.display = 'none';
    }
});
