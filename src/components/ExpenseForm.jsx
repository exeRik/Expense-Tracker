import { Card, TextInput, NumberInput, Select, Button, Group, Stack, SegmentedControl, Divider } from "@mantine/core";
import { categorySelectData } from "../utils/constants";

export default function ExpenseForm({
  formData,
  setFormData,
  editingId,
  setEditingId,
  addExpense,
  updateExpense,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.description || !formData.amount || !formData.category || !formData.date) return;

    if (editingId) {
      updateExpense(editingId, formData);
      setEditingId(null);
    } else {
      addExpense(formData);
    }

    setFormData({
      description: "",
      amount: "",
      category: "",
      date: new Date().toISOString().split("T")[0],
      type: "expense", 
    });
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
            onChange={(val) => setFormData({ ...formData, type: val })}
            data={[
              { label: "Income", value: "income" },
              { label: "Expences", value: "expences" },
            ]}
          />

          <Divider my="xs" />

          {/* Inputs */}
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
            min={0}
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

          {/* Buttons */}
          <Group justify="flex-end" mt="sm">
            <Button
              type="submit"
              radius="md"
              size="md"
              color={
                editingId
                  ? "blue"
                  : formData.type === "income"
                  ? "darkgreen"
                  : "darkred"
              }
            >
              {editingId
                ? "Update Entry"
                : formData.type === "income"
                ? "Add Income"
                : "Add Expense"}
            </Button>
          </Group>
        </Stack>
      </form>
    </Card>
  );
}
