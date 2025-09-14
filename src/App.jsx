import React, { useState } from "react";
import { MantineProvider, Box, Container, Tabs } from "@mantine/core";

import useExpenses from "./hooks/useExpenses";
import useExpenseFilters from "./hooks/useExpenseFilters";
import { calculateTotal, groupExpensesByCategory, groupExpensesByDate } from "./utils/calculations";
import { themeColors} from "./utils/theme";

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
    colors: themeColors,
    primaryColor: "darkgreen", 
  }}
>
    <Box
      style={{
        background: "linear-gradient(135deg, #c6b7babc 0%, #ede3e69f 100%)",
        minHeight: "100vh",
      }}
    >
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
