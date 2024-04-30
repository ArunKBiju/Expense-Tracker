// Load income history from localStorage or initialize an empty array
let incomeHistory = localStorage.getItem('incomeHistory');
if (!incomeHistory) {
    incomeHistory = [];
} else {
    incomeHistory = JSON.parse(incomeHistory);
}

// Function to calculate total income
function calculateTotalIncome() {
    let totalIncome = 0;
    incomeHistory.forEach(item => {
        totalIncome += parseInt(item.amount);
    });
    return totalIncome;
}

// Function to update the total income in the UI
function updateTotalIncome() {
    document.getElementById('total-income').innerText = `₹ ${calculateTotalIncome()}`;
}

// Function to render income history
function renderIncomeHistory() {
    const incomeHistoryList = document.getElementById('income-history');
    incomeHistoryList.innerHTML = '';
    incomeHistory.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `Source: ${item.source}, Amount: ₹${item.amount} 
            <button class="edit-btn" data-index="${index}">Edit</button> 
            <button class="delete-btn" data-index="${index}">Delete</button>`;
        incomeHistoryList.appendChild(li);
    });
}

// Initial rendering
updateTotalIncome();
renderIncomeHistory();

// Add income form submit event
document.getElementById('income-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const source = document.getElementById('source').value.trim();
    const amount = document.getElementById('amount').value.trim();

    if (!source || !amount) {
        alert('Please enter source and amount');
        return;
    }

    incomeHistory.push({ source, amount });
    localStorage.setItem('incomeHistory', JSON.stringify(incomeHistory));
    updateTotalIncome();
    renderIncomeHistory();
    document.getElementById('source').value = '';
    document.getElementById('amount').value = '';
