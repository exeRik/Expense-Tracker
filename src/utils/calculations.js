export const groupExpensesByCategory = (expenses) =>
  expenses.reduce((acc, expense) => {
    const category = expense.category;
    acc[category] = (acc[category] || 0) + expense.amount;
    return acc;
  }, {});

export const groupExpensesByDate = (expenses) =>
  expenses.reduce((acc, expense) => {
    const date = expense.date;
    acc[date] = (acc[date] || 0) + expense.amount;
    return acc;
  }, {});

export const calculateTotal = (expenses) =>
  expenses.reduce((total, expense) => total + expense.amount, 0);
