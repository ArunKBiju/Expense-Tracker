// Variables to store income history and total income
let incomeHistory = [];
let totalIncome = 0;

// DOM elements
const totalIncomeElement = document.getElementById('total-income');
const incomeHistoryElement = document.getElementById('income-history');
const moreBtn = document.getElementById('more-btn');
const addIncomeForm = document.getElementById('add-income-form');

// Function to update total income
function updateTotalIncome() {
    totalIncome = incomeHistory.reduce((total, income) => total + income.amount, 0);
    totalIncomeElement.textContent = `Total Income Till Now: ₹ ${totalIncome.toFixed(2)}`;
}

// Function to update income history
function updateIncomeHistory() {
    incomeHistoryElement.innerHTML = '';
    incomeHistory.slice(0, 10).forEach((income, index) => {
        const li = document.createElement('li');
        li.textContent = `${income.source} - ₹ ${income.amount}`;
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.classList.add('edit-btn');
        editBtn.addEventListener('click', () => {
            const newSource = prompt('Enter new source:');
            const newAmount = parseFloat(prompt('Enter new amount:'));
            if (newSource && !isNaN(newAmount)) {
                income.source = newSource;
                income.amount = newAmount;
                updateIncomeHistory();
                updateTotalIncome();
                localStorage.setItem('incomeHistory', JSON.stringify(incomeHistory));
            }
        });
        li.appendChild(editBtn);
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', () => {
            incomeHistory.splice(index, 1);
            updateIncomeHistory();
            updateTotalIncome();
            localStorage.setItem('incomeHistory', JSON.stringify(incomeHistory));
        });
        li.appendChild(deleteBtn);
        incomeHistoryElement.appendChild(li);
    });
    if (incomeHistory.length > 10) {
        moreBtn.style.display = 'block';
    } else {
        moreBtn.style.display = 'none';
    }
}

// Event listener for the add income form submission
addIncomeForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const source = event.target.elements['source'].value.trim();
    const amount = parseFloat(event.target.elements['amount'].value);
    if (source && !isNaN(amount)) {
        incomeHistory.unshift({ source, amount });
        updateIncomeHistory();
        updateTotalIncome();
        localStorage.setItem('incomeHistory', JSON.stringify(incomeHistory));
        event.target.reset();
    } else {
        alert('Please enter a valid source and amount.');
    }
});

// Load income history from localStorage if available
if (localStorage.getItem('incomeHistory')) {
    incomeHistory = JSON.parse(localStorage.getItem('incomeHistory'));
    updateIncomeHistory();
    updateTotalIncome();
}

// Event listener for the "More" button to show additional income history
moreBtn.addEventListener('click', () => {
    incomeHistoryElement.innerHTML = '';
    incomeHistory.forEach((income) => {
        const li = document.createElement('li');
        li.textContent = `${income.source} - ₹ ${income.amount}`;
        incomeHistoryElement.appendChild(li);
    });
    moreBtn.style.display = 'none';
});
