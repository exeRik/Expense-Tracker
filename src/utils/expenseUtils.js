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
      ? acc + Number(item.amount)  
      : acc - Number(item.amount);  
  }, 0);
};

// Helper function to get total by type
export const getTotalByType = (items, type) => {
  return items
    .filter(item => item.type === type)
    .reduce((acc, item) => acc + Number(item.amount), 0);
};

// New optimized function to calculate all totals at once
export const calculateTotalsByType = (expenses) => {
  const totals = expenses.reduce((acc, item) => {
    const amount = Number(item.amount);
    if (item.type === "income") {
      acc.totalIncome += amount;
    } else if (item.type === "expense") {
      acc.totalExpense += amount;
    }
    return acc;
  }, { totalIncome: 0, totalExpense: 0 });

  return {
    ...totals,
    totalBalance: totals.totalIncome - totals.totalExpense
  };
};