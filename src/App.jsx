import React, { useState } from "react";
import { MantineProvider, Box, Container, Tabs } from "@mantine/core";
import useExpenses from "./hooks/useExpenses";
import useExpenseFilters from "./hooks/useExpenseFilters";
import { calculateTotal, groupExpensesByCategory, groupExpensesByDate } from "./utils/calculations";

import Header from "./components/Header";
import TotalCard from "./components/TotalCard";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import Charts from "./components/Charts";

const App = () => {
  const { expenses, addExpense, updateExpense, deleteExpense } = useExpenses();
  const { filteredExpenses, categoryFilter, setCategoryFilter, dateRange, setDateRange } =
    useExpenseFilters(expenses);

  const [editingExpense, setEditingExpense] = useState(null);

  const totalExpenses = calculateTotal(filteredExpenses);
  const categoryData = groupExpensesByCategory(filteredExpenses);
  const timeData = groupExpensesByDate(filteredExpenses);

  const startEdit = (expense) => {
    setEditingExpense(expense);
  };

  const cancelEdit = () => {
    setEditingExpense(null);
  };

  return (
   <MantineProvider
  theme={{
    colorScheme: "light",
    colors: {
      darkgreen: [
        "#e6f4e6", // 0 - lightest
        "#c2e3c2", // 1
        "#9dd29d", // 2
        "#78c278", // 3
        "#53b153", // 4
        "#3a973a", // 5 (← usually used for filled buttons)
        "#2c7530", // 6
        "#1e5223", // 7
        "#103116", // 8

      ],
    },
    primaryColor: "darkgreen", 
  }}
>
      <Box style={{ background: "linear-gradient(135deg, #7b7b89c1 0%, #9dadbeff 100%)", minHeight: "100vh" }}>
        <Container size="xl" py="xl">
          <Header />
          <TotalCard total={totalExpenses} />

          <Tabs defaultValue="add" variant="pills" radius="md" color="darkgreen">
            <Tabs.List grow mb="xl">
              <Tabs.Tab value="add">Add Expense</Tabs.Tab>
              <Tabs.Tab value="list">Expense List</Tabs.Tab>
              <Tabs.Tab value="charts">Analytics</Tabs.Tab>
            </Tabs.List>

            {/* Add / Edit Expense */}
            <Tabs.Panel value="add" >
              <ExpenseForm
                addExpense={addExpense}
                updateExpense={updateExpense}
                editingExpense={editingExpense}
                cancelEdit={cancelEdit}
              />
            </Tabs.Panel>

            {/* Expense List */}
            <Tabs.Panel value="list" >
              <ExpenseList
                expenses={filteredExpenses}
                deleteExpense={deleteExpense}
                startEdit={startEdit}
                categoryFilter={categoryFilter}
                setCategoryFilter={setCategoryFilter}
                dateRange={dateRange}
                setDateRange={setDateRange}
              />
            </Tabs.Panel>

            {/* Charts */}
            <Tabs.Panel value="charts">
              <Charts categoryData={categoryData} timeData={timeData} />
            </Tabs.Panel>
          </Tabs>
        </Container>
      </Box>
    </MantineProvider>
  );
};

export default App;
