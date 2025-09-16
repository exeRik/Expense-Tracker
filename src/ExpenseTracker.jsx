import { useState, useMemo, useCallback } from "react";
import { Container, Tabs, Box, Center } from "@mantine/core";

import { useExpenses } from "./hooks/useExpenses";
import { useExpenseFilters } from "./hooks/useExpenseFilters";
import { calculateTotalsByType } from "./utils/expenseUtils";
import { COLORS, INITIAL_FORM_DATA, TAB_CONFIG } from "./utils/constants";

import Header from "./components/Header";
import TotalCard from "./components/TotalCard";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import ExpenseCharts from "./components/ExpenseCharts";

export default function ExpenseTracker() {
  const { expenses, addExpense, updateExpense, deleteExpense } = useExpenses();
  const { filteredExpenses, categoryFilter, setCategoryFilter, dateRange, setDateRange } =
    useExpenseFilters(expenses);

  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [editingId, setEditingId] = useState(null);
  const [activeTab, setActiveTab] = useState("add");


  const { totalIncome, totalExpense, totalBalance } = useMemo(() => 
    calculateTotalsByType(expenses), [expenses]
  );

  const startEdit = useCallback((expense) => {
    const { id, type, ...editableFields } = expense;
    setFormData(editableFields);
    setEditingId(id);
    setActiveTab("add");
  }, []);

  const resetForm = useCallback(() => {
    setFormData(INITIAL_FORM_DATA);
    setEditingId(null);
  }, []);


  const handleAddExpenseWithBalanceCheck = useCallback((expense) => {
    if (expense.type === "expense") {
      const expenseAmount = parseFloat(expense.amount);
      const availableBalance = totalBalance;
      
      if (expenseAmount > availableBalance) {
        return {
          success: false,
          message: `Not enough balance! Available: RS.${availableBalance.toFixed(2)}, Required: RS.${expenseAmount.toFixed(2)}`
        };
      }
    }
    
    addExpense(expense);
    return { success: true };
  }, [totalBalance, addExpense]);


  const handleUpdateExpenseWithBalanceCheck = useCallback((id, updatedExpense) => {
    if (updatedExpense.type === "expense") {
      const newAmount = parseFloat(updatedExpense.amount);
      const currentExpense = expenses.find(exp => exp.id === id);
      const currentAmount = currentExpense?.amount || 0;
      const amountDifference = newAmount - currentAmount;

      if (amountDifference > 0 && amountDifference > totalBalance) {
        return {
          success: false,
          message: `Not enough balance for this increase! Available: RS.${totalBalance.toFixed(2)}, Additional needed: RS.${amountDifference.toFixed(2)}`
        };
      }
    }
    
    updateExpense(id, updatedExpense);
    return { success: true };
  }, [totalBalance, updateExpense, expenses]);

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
          totalBalance={totalBalance}
        />

        <Tabs value={activeTab} onChange={setActiveTab} mb="xl">
          <Center>
            <Tabs.List grow mb="xl">
              {TAB_CONFIG.map(({ value, label, icon: Icon }) => (
                <Tabs.Tab key={value} value={value} leftSection={<Icon size={16} />}>
                  {label}
                </Tabs.Tab>
              ))}
            </Tabs.List>
          </Center>

          <Tabs.Panel value="add">
            <ExpenseForm
              formData={formData}
              setFormData={setFormData}
              editingId={editingId}
              addExpense={handleAddExpenseWithBalanceCheck}
              updateExpense={handleUpdateExpenseWithBalanceCheck}
              resetForm={resetForm}
              currentBalance={totalBalance}
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