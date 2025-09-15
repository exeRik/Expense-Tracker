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

export const calculateTotal = (items) => {
  return items.reduce((acc, item) => {
    return item.type === "income"
      ? acc + Number(item.amount)   // ➕ income
      : acc - Number(item.amount);  // ➖ expense
  }, 0);
};
