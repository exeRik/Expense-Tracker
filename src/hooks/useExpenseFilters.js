import { useState, useMemo } from "react";

const useExpenseFilters = (expenses) => {
  const [categoryFilter, setCategoryFilter] = useState("");
  const [dateRange, setDateRange] = useState({ start: null, end: null });

  const filteredExpenses = useMemo(() => {
    return expenses.filter((expense) => {
      const categoryMatch = !categoryFilter || expense.category === categoryFilter;
      const startDateMatch =
        !dateRange.start ||
        expense.date >= dateRange.start.toISOString().split("T")[0];
      const endDateMatch =
        !dateRange.end ||
        expense.date <= dateRange.end.toISOString().split("T")[0];
      return categoryMatch && startDateMatch && endDateMatch;
    });
  }, [expenses, categoryFilter, dateRange]);

  return { filteredExpenses, categoryFilter, setCategoryFilter, dateRange, setDateRange };
};

export default useExpenseFilters;
