// Read the income.txt file
fetch('income.txt')
    .then(response => response.text())
    .then(data => {
        var incomes = data.split('\n');
        var totalIncome = incomes.reduce((acc, income) => acc + parseFloat(income.split('-')[1]), 0);
        document.getElementById('total-income').textContent = 'Total Income: ' + totalIncome.toFixed(2);
        var historyList = document.getElementById('income-history');
        incomes.forEach(income => {
            var [source, amount] = income.split('-');
            var li = document.createElement('li');
            li.classList.add('income-entry');
            li.innerHTML = `
                <span>${source}</span>
                <span>${amount}</span>
                <button class="edit-btn">Edit</button>
                <button class="done-btn">Done</button>
                <button class="delete-btn">Delete</button>
            `;
            historyList.appendChild(li);
        });

        document.getElementById('income-form').addEventListener('submit', function(event) {
            event.preventDefault();
            var source = document.getElementById('source').value.trim();
            var amount = parseFloat(document.getElementById('amount').value.trim()).toFixed(2);
            var newIncome = source + '-' + amount;
            fetch('income.txt', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: newIncome
                })
                .then(response => {
                    if (response.ok) {
                        location.reload();
                    }
                });
        });

        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                var entry = this.parentNode;
                entry.querySelector('span').setAttribute('contenteditable', 'true');
                entry.querySelector('span:nth-child(2)').setAttribute('contenteditable', 'true');
                this.classList.remove('active');
                entry.querySelector('.done-btn').classList.add('active');
            });
        });

        document.querySelectorAll('.done-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                var entry = this.parentNode;
                var source = entry.querySelector('span').textContent.trim();
                var amount = parseFloat(entry.querySelector('span:nth-child(2)').textContent.trim()).toFixed(2);
                var newIncome = source + '-' + amount;
                fetch('income.txt', {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        body: newIncome
                    })
                    .then(response => {
                        if (response.ok) {
                            location.reload();
                        }
                    });
            });
        });

        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                var entry = this.parentNode;
                var source = entry.querySelector('span').textContent.trim();
                var amount = parseFloat(entry.querySelector('span:nth-child(2)').textContent.trim()).toFixed(2);
                var incomeToDelete = source + '-' + amount;
                fetch('income.txt', {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        body: incomeToDelete
                    })
                    .then(response => {
                        if (response.ok) {
                            location.reload();
                        }
                    });
            });
        });
    });
