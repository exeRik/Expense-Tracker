import { Card, TextInput, NumberInput, Select, Button, Group, Stack, SegmentedControl, Divider, Alert } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import { categorySelectData, INITIAL_FORM_DATA } from "../utils/constants";

const NOTIFICATION_CONFIG = {
  income: {
    title: "Income Added! ",
    color: "green",
    icon: "💰"
  },
  expense: {
    title: "Expense Added! ", 
    color: "teal",
    icon: "📝"
  },
  update: {
    title: "Entry Updated! ",
    color: "blue",
    icon: "✅"
  },
  error: {
    title: "Error",
    color: "red",
    icon: "❌"
  }
};

export default function ExpenseForm({
  formData,
  setFormData,
  editingId,
  addExpense,
  updateExpense,
  resetForm,
  currentBalance = 0
}) {
  const [balanceWarning, setBalanceWarning] = useState(null);

  // Check balance in real-time for expense entries
  const checkBalanceWarning = (amount, type) => {
    if (type === "expense" && amount > currentBalance) {
      setBalanceWarning(`Insufficient balance! Available: RS.${currentBalance.toFixed(2)}`);
    } else {
      setBalanceWarning(null);
    }
  };

  const handleAmountChange = (value) => {
    const newAmount = parseFloat(value) || 0;
    setFormData({ ...formData, amount: value });
    checkBalanceWarning(newAmount, formData.type);
  };

  const handleTypeChange = (type) => {
    setFormData({ ...formData, type });
    if (formData.amount) {
      checkBalanceWarning(parseFloat(formData.amount), type);
    }
  };

  const showNotification = (type, data) => {
    const config = NOTIFICATION_CONFIG[type];
    notifications.show({
      title: config.title,
      message: type === "update" 
        ? `${data.description} (${data.type}) was updated successfully`
        : `${data.description} - RS.${data.amount} saved successfully`,
      color: config.color,
      autoClose: 4000,
      position: 'top-right',
    });
  };

  const validateForm = () => {
    const requiredFields = ['description', 'amount', 'category', 'date'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      notifications.show({
        title: "Missing Information",
        message: "Please fill in all required fields",
        color: "red",
        autoClose: 4000,
      });
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    if (editingId) {
      const result = updateExpense(editingId, formData);
      if (result.success) {
        showNotification("update", formData);
        resetForm();
      } else {
        notifications.show({
          title: "Update Failed",
          message: result.message,
          color: "red",
          autoClose: 5000,
        });
      }
    } else {
      const result = addExpense(formData);
      if (result.success) {
        showNotification(formData.type, formData);
        resetForm();
        setBalanceWarning(null);
      } else {
        notifications.show({
          title: "Insufficient Balance",
          message: result.message,
          color: "red",
          autoClose: 5000,
        });
      }
    }
  };

  const getSubmitButtonColor = () => {
    if (editingId) return "blue";
    return formData.type === "income" ? "darkgreen" : "darkred";
  };

  const getSubmitButtonText = () => {
    if (editingId) return "Update Entry";
    return formData.type === "income" ? "Add Income" : "Add Expense";
  };

  return (
    <Card shadow="sm" radius="lg" withBorder padding="xl" style={{ background: "white" }}>
      <form onSubmit={handleSubmit}>
        <Stack spacing="md">
          <SegmentedControl
            fullWidth
            size="sm"
            radius="md"
            value={formData.type}
            onChange={handleTypeChange}
            data={[
              { label: "Income", value: "income" },
              { label: "Expenses", value: "expense" },
            ]}
          />

          <Divider my="xs" />

          {/* Balance Warning */}
          {balanceWarning && (
            <Alert 
              icon={<AlertTriangle size={16} />} 
              color="yellow" 
              variant="light"
            >
              {balanceWarning}
            </Alert>
          )}

          {/* Form Inputs */}
          <TextInput
            label="Description"
            placeholder="e.g. Lunch, Bus Ticket"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
          />

          <NumberInput
            label="Amount"
            placeholder="Enter amount"
            value={formData.amount}
            onChange={handleAmountChange}
            required
            min={0}
            error={balanceWarning && formData.type === "expense" ? "Amount exceeds available balance" : null}
          />

          <Select
            label="Category"
            placeholder="Select category"
            data={categorySelectData}
            value={formData.category}
            onChange={(val) => setFormData({ ...formData, category: val })}
            required
            searchable
          />

          <TextInput
            label="Date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
          />

          {/* Submit Button */}
          <Group justify="flex-end" mt="sm">
            <Button
              type="submit"
              radius="md"
              size="md"
              color={getSubmitButtonColor()}
              disabled={balanceWarning && formData.type === "expense" && !editingId}
            >
              {getSubmitButtonText()}
            </Button>
          </Group>
        </Stack>
      </form>
    </Card>
  );
}