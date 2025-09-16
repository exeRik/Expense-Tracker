export const groupExpensesByCategory = (expenses, type = null) => {
  const filteredExpenses = type ? expenses.filter(expense => expense.type === type) : expenses;
  return filteredExpenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});
};

export const groupExpensesByDate = (expenses, type = null) => {
  const filteredExpenses = type ? expenses.filter(expense => expense.type === type) : expenses;
  return filteredExpenses.reduce((acc, expense) => {
    acc[expense.date] = (acc[expense.date] || 0) + expense.amount;
    return acc;
  }, {});
};

export const calculateTotal = (items) => {
  return items.reduce((acc, item) => {
    return item.type === "income"
      ? acc + Number(item.amount)   // ➕ income
      : acc - Number(item.amount);  // ➖ expense
  }, 0);
};

// Helper function to get total by type
export const getTotalByType = (items, type) => {
  return items
    .filter(item => item.type === type)
    .reduce((acc, item) => acc + Number(item.amount), 0);
};