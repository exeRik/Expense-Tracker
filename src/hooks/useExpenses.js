import { useState, useEffect } from "react";

const useExpenses = () => {
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem("expenses");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (expense) => {
    const newExpense = {
      id: Date.now() + Math.random(),
      ...expense,
      amount: parseFloat(expense.amount),
      date: expense.date.toISOString().split("T")[0],
    };
    setExpenses((prev) => [...prev, newExpense]);
  };

  const updateExpense = (id, updatedExpense) => {
    setExpenses((prev) =>
      prev.map((expense) =>
        expense.id === id
          ? {
              ...expense,
              ...updatedExpense,
              amount: parseFloat(updatedExpense.amount),
              date: updatedExpense.date.toISOString().split("T")[0],
            }
          : expense
      )
    );
  };

  const deleteExpense = (id) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));
  };

  return { expenses, addExpense, updateExpense, deleteExpense };
};

export default useExpenses;
