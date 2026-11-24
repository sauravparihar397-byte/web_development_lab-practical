//<!--AI NAHI HAI SIR-->
const expenseForm = document.getElementById("expenseForm");
const expenseName = document.getElementById("expenseName");
const expenseAmount = document.getElementById("expenseAmount");
const category = document.getElementById("category");
const categoryFilter = document.getElementById("categoryFilter");
const expenseList = document.getElementById("expenseList");
const total = document.getElementById("total");
const emptyMessage = document.getElementById("emptyMessage");
const errorMessage = document.getElementById("errorMessage");
let expenses = [];
function renderExpenses() {
  const filter = categoryFilter.value;
  const filteredExpenses = [];
  for (let i = 0; i < expenses.length; i++) {
    if (filter === "All" || expenses[i].category === filter) {
      filteredExpenses.push(expenses[i]);
    }
  }
  expenseList.innerHTML = "";
  for (let i = 0; i < filteredExpenses.length; i++) {
    const expense = filteredExpenses[i];
    const item = document.createElement("li");
    item.className = "expense-item";
    const name = document.createElement("span");
    name.className = "expense-name";
    name.textContent = expense.name;
    const categoryText = document.createElement("span");
    categoryText.className = "expense-category";
    categoryText.textContent = expense.category;
    const amount = document.createElement("span");
    amount.className = "expense-amount";
    amount.textContent = String(expense.amount);
    item.appendChild(name);
    item.appendChild(categoryText);
    item.appendChild(amount);
    expenseList.appendChild(item);
    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "delete-button";
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", function() {
      const expenseIndex = expenses.indexOf(expense);
      if (expenseIndex !== -1) {
        expenses.splice(expenseIndex, 1);
      }
      renderExpenses();
    });
    item.appendChild(deleteButton);
  }
  let totalAmount = 0;
  for (let i = 0; i < expenses.length; i++) {
    totalAmount += expenses[i].amount;
  }
  total.textContent = String(totalAmount);
  emptyMessage.hidden = filteredExpenses.length > 0;
  emptyMessage.textContent = expenses.length === 0 ? "No expenses added yet." : "No expenses in this category.";
}
categoryFilter.addEventListener("change", renderExpenses);
expenseForm.addEventListener("submit", function(event) {
  event.preventDefault();
  errorMessage.textContent = "";
  const name = expenseName.value.trim();
  const amount = Number(expenseAmount.value);
  if (!name) {
    errorMessage.textContent = "Enter an expense name.";
    expenseName.focus();
    return;
  }
  if (amount % 1 !== 0 || amount <= 0) {
    errorMessage.textContent = "Enter a whole amount greater than zero.";
    expenseAmount.focus();
    return;
  }
  expenses.push({
    name: name,
    amount: amount,
    category: category.value,
  });
  expenseForm.reset();
  renderExpenses();
  expenseName.focus();
});
renderExpenses();