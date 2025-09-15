import { useState, useMemo } from "react";

export const useExpenseFilters = (expenses) => {
  const [categoryFilter, setCategoryFilter] = useState("");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });

  const filteredExpenses = useMemo(() => {
    return expenses.filter((expense) => {
      const categoryMatch = !categoryFilter || expense.category === categoryFilter;
      const startDateMatch = !dateRange.start || expense.date >= dateRange.start;
      const endDateMatch = !dateRange.end || expense.date <= dateRange.end;
      return categoryMatch && startDateMatch && endDateMatch;
    });
  }, [expenses, categoryFilter, dateRange]);

  return { filteredExpenses, categoryFilter, setCategoryFilter, dateRange, setDateRange };
};
