import { useState } from "react";
import { Container, Tabs, Box, Center } from "@mantine/core";
import { Plus, Filter, TrendingUp } from "lucide-react";
import { SegmentedControl } from '@mantine/core';

import { useExpenses } from "./hooks/useExpenses";
import { useExpenseFilters } from "./hooks/useExpenseFilters";
import { calculateTotal } from "./utils/expenseUtils";
import { COLORS } from "./utils/constants";

import Header from "./components/Header";
import TotalCard from "./components/TotalCard";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import ExpenseCharts from "./components/ExpenseCharts";

export default function ExpenseTracker() {
  const { expenses, addExpense, updateExpense, deleteExpense } = useExpenses();
  const { filteredExpenses, categoryFilter, setCategoryFilter, dateRange, setDateRange } =
    useExpenseFilters(expenses);

  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    category: "",
    date: new Date().toISOString().split("T")[0],
    type: "expense",
  });
  const [editingId, setEditingId] = useState(null);
  const [activeTab, setActiveTab] = useState("add");

  const totalExpenses = calculateTotal(filteredExpenses);
 const totalIncome = expenses
    .filter(item => item.type === "income")
    .reduce((sum, item) => sum + Number(item.amount), 0);

  const totalExpense = expenses
    .filter(item => item.type === "expense")  
    .reduce((sum, item) => sum + Number(item.amount), 0);

  const totalBalance = totalIncome - totalExpense;


  //  handle editing: prefill form + switch to Add Expense tab
  const startEdit = (expense) => {
    setFormData({
      description: expense.description,
      amount: expense.amount,
      category: expense.category,
      date: expense.date,
    });
    setEditingId(expense.id);
    setActiveTab("add");
  };

  return (
    <Box
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #d2c8ca94 0%, #ede3e69f 100%)",
        padding: "16px"
      }}
    >
      <Container size="xl">
        <Header />
<TotalCard 
  totalIncome={totalIncome} 
  totalExpense={totalExpense}
  totalExpenses={totalBalance}
/>

        <Tabs value={activeTab} onChange={setActiveTab} mb="xl">
          <Center>
            <Tabs.List grow mb="xl">
              <Tabs.Tab value="add" leftSection={<Plus size={16} />}>
                Add Details
              </Tabs.Tab>
              <Tabs.Tab value="list" leftSection={<Filter size={16} />}>
                Statement
              </Tabs.Tab>
              <Tabs.Tab value="charts" leftSection={<TrendingUp size={16} />}>
                Analytics
              </Tabs.Tab>
            </Tabs.List>
          </Center>

          <Tabs.Panel value="add">
            <ExpenseForm
              formData={formData}
              setFormData={setFormData}
              editingId={editingId}
              setEditingId={setEditingId}
              addExpense={addExpense}
              updateExpense={updateExpense}
            />
          </Tabs.Panel>

          <Tabs.Panel value="list">
            <ExpenseList
              filteredExpenses={filteredExpenses}
              categoryFilter={categoryFilter}
              setCategoryFilter={setCategoryFilter}
              dateRange={dateRange}
              setDateRange={setDateRange}
              startEdit={startEdit}
              deleteExpense={deleteExpense}
            />
          </Tabs.Panel>

          <Tabs.Panel value="charts">
            <ExpenseCharts expenses={filteredExpenses} COLORS={COLORS} />
          </Tabs.Panel>
        </Tabs>
      </Container>
    </Box>
  );
}
