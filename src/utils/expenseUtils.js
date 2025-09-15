export const groupExpensesByCategory = (expenses) => {
  return expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});
};

export const groupExpensesByDate = (expenses) => {
  return expenses.reduce((acc, expense) => {
    acc[expense.date] = (acc[expense.date] || 0) + expense.amount;
    return acc;
  }, {});
};

export const calculateTotal = (expenses) =>
  expenses.reduce((total, expense) => total + expense.amount, 0);
