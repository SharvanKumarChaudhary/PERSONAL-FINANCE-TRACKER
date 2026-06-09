const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");
const list = document.getElementById("list");
const form = document.getElementById("transaction-form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function updateUI() {
    list.innerHTML = "";

    let total = 0;
    let incomeTotal = 0;
    let expenseTotal = 0;

    transactions.forEach((transaction, index) => {
        total += transaction.amount;

        if(transaction.amount > 0){
            incomeTotal += transaction.amount;
        } else {
            expenseTotal += Math.abs(transaction.amount);
        }

        const li = document.createElement("li");
        li.innerHTML = `
            ${transaction.text} (${transaction.amount})
            <span class="delete" onclick="removeTransaction(${index})">❌</span>
        `;
        list.appendChild(li);
    });

    balance.textContent = `₹${total}`;
    income.textContent = `₹${incomeTotal}`;
    expense.textContent = `₹${expenseTotal}`;

    localStorage.setItem("transactions", JSON.stringify(transactions));
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const transaction = {
        text: text.value,
        amount: Number(amount.value)
    };

    transactions.push(transaction);

    text.value = "";
    amount.value = "";

    updateUI();
});

function removeTransaction(index){
    transactions.splice(index, 1);
    updateUI();
}

updateUI();