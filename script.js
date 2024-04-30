document.addEventListener('DOMContentLoaded', function () {
    const totalIncomeElement = document.getElementById('total-income');
    const incomeForm = document.getElementById('income-form');
    const incomeHistoryElement = document.getElementById('income-history');
    const moreBtn = document.getElementById('more-btn');

    let totalIncome = 0;
    let incomeHistory = [];

    // Function to update total income
    function updateTotalIncome() {
        totalIncomeElement.textContent = `Total Income: ₹ ${totalIncome}`;
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
                    incomeHistory[index].source = newSource;
                    incomeHistory[index].amount = newAmount;
                    updateIncomeHistory();
                    updateTotalIncome();
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

    // Show more income history
    moreBtn.addEventListener('click', () => {
        incomeHistoryElement.innerHTML = '';
        incomeHistory.slice(10, 20).forEach((income, index) => {
            const li = document.createElement('li');
            li.textContent = `${income.source} - ₹ ${income.amount}`;
            const editBtn = document.createElement('button');
            editBtn.textContent = 'Edit';
            editBtn.classList.add('edit-btn');
            editBtn.addEventListener('click', () => {
                const newSource = prompt('Enter new source:');
                const newAmount = parseFloat(prompt('Enter new amount:'));
                if (newSource && !isNaN(newAmount)) {
                    incomeHistory[index + 10].source = newSource;
                    incomeHistory[index + 10].amount = newAmount;
                    updateIncomeHistory();
                    updateTotalIncome();
                }
            });
            li.appendChild(editBtn);
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.classList.add('delete-btn');
            deleteBtn.addEventListener('click', () => {
                incomeHistory.splice(index + 10, 1);
                updateIncomeHistory();
                updateTotalIncome();
            });
            li.appendChild(deleteBtn);
            incomeHistoryElement.appendChild(li);
        });
    });

    // Load income history from local storage
    const storedIncomeHistory = localStorage.getItem('incomeHistory');
    if (storedIncomeHistory) {
        incomeHistory = JSON.parse(storedIncomeHistory);
        totalIncome = incomeHistory.reduce((total, income) => total + income.amount, 0);
    }

    updateTotalIncome();
    updateIncomeHistory();

    // Add income
    incomeForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const source = this.source.value.trim();
        const amount = parseFloat(this.amount.value);
        if (source && !isNaN(amount)) {
            totalIncome += amount;
            incomeHistory.unshift({ source, amount });
            updateTotalIncome();
            updateIncomeHistory();
            localStorage.setItem('incomeHistory', JSON.stringify(incomeHistory));
            this.reset();
        }
    });
});
