import { MantineProvider, Container, Tabs, Box } from "@mantine/core";
import useExpenses from "./hooks/useExpenses";
import useExpenseFilters from "./hooks/useExpenseFilters";
import { calculateTotal, groupExpensesByCategory, groupExpensesByDate } from "./utils/calculations";
import Header from "./components/Header";
import TotalCard from "./components/TotalCard";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import Charts from "./components/Charts";

const ExpenseTracker = () => {
  const { expenses, addExpense, updateExpense, deleteExpense } = useExpenses();
  const { filteredExpenses, categoryFilter, setCategoryFilter, dateRange, setDateRange } =
    useExpenseFilters(expenses);

  const totalExpenses = calculateTotal(filteredExpenses);
  const categoryData = groupExpensesByCategory(filteredExpenses);
  const timeData = groupExpensesByDate(filteredExpenses);

  return (
    <MantineProvider defaultColorScheme="dark">
      <Box style={{ background: "linear-gradient(135deg, #ccced6ff 0%, #c4bacdff 100%)", minHeight: "100vh" }}>
        <Container size="l" py="xl">
          <Header />
          <TotalCard total={totalExpenses} />

          <Tabs defaultValue="add" variant="pills" radius="md">
            <Tabs.List grow mb="xl">
              <Tabs.Tab value="add">Add Expense</Tabs.Tab>
              <Tabs.Tab value="list">Expense List</Tabs.Tab>
              <Tabs.Tab value="charts">Analytics</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="add">
              <ExpenseForm addExpense={addExpense} updateExpense={updateExpense} />
            </Tabs.Panel>

            <Tabs.Panel value="list">
              <ExpenseList
                expenses={filteredExpenses}
                deleteExpense={deleteExpense}
                startEdit={() => {}}
                categoryFilter={categoryFilter}
                setCategoryFilter={setCategoryFilter}
                dateRange={dateRange}
                setDateRange={setDateRange}
              />
            </Tabs.Panel>

            <Tabs.Panel value="charts">
              <Charts categoryData={categoryData} timeData={timeData} />
            </Tabs.Panel>
          </Tabs>
        </Container>
      </Box>
    </MantineProvider>
  );
};

export default ExpenseTracker;
