import { useState, useEffect } from "react";

export const useExpenses = () => {

  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem("expenses");
    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });


  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (expense) => {
    const newExpense = {
      id: Date.now() + Math.random(), // unique id
      ...expense,
      amount: parseFloat(expense.amount),
    };
    setExpenses((prev) => [...prev, newExpense]);
  };

  const updateExpense = (id, updatedExpense) => {
    setExpenses((prev) =>
      prev.map((expense) =>
        expense.id === id
          ? { ...expense, ...updatedExpense, amount: parseFloat(updatedExpense.amount) }
          : expense
      )
    );
  };

  const deleteExpense = (id) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));
  };

  return { expenses, addExpense, updateExpense, deleteExpense };
};
