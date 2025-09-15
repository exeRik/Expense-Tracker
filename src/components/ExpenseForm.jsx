import { useEffect } from "react";
import { Card, TextInput, NumberInput, Select, Button, Group, Stack } from "@mantine/core";
import { categorySelectData } from "../utils/constants";

export default function ExpenseForm({ formData, setFormData, editingId, setEditingId, addExpense, updateExpense }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.description || !formData.amount || !formData.category || !formData.date) return;

    if (editingId) {
      updateExpense(editingId, formData);
      setEditingId(null);
    } else {
      addExpense(formData);
    }

    setFormData({ description: "", amount: "", category: "", date: new Date().toISOString().split("T")[0] });
  };

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <form onSubmit={handleSubmit}>
        <Stack>
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
            onChange={(val) => setFormData({ ...formData, amount: val })}
            required
          />
          <Select
            label="Category"
            placeholder="Select category"
            data={categorySelectData}
            value={formData.category}
            onChange={(val) => setFormData({ ...formData, category: val })}
            required
          />
          <TextInput
            label="Date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
          />

          <Group justify="flex-end" mt="md">
            <Button type="submit" color={editingId ? "yellow" : "blue"}>
              {editingId ? "Update Expense" : "Add Expense"}
            </Button>
          </Group>
        </Stack>
      </form>
    </Card>
  );
}
