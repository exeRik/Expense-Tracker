import { Card, TextInput, NumberInput, Select, Button, Group, Stack, SegmentedControl, Divider } from "@mantine/core";
import { notifications } from "@mantine/notifications";
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
    
    // Validation
    if (!formData.description || !formData.amount || !formData.category || !formData.date) {
      notifications.show({
        title: "Missing Information",
        message: "Please fill in all required fields",
        color: "red",
        autoClose: 4000,
      });
      return;
    }

    if (editingId) {
      updateExpense(editingId, formData);
      setEditingId(null);

      // Show update notification
      notifications.show({
        title: "Entry Updated! ✅",
        message: `${formData.description} (${formData.type}) was updated successfully`,
        color: "blue",
        autoClose: 4000,
        position: 'top-right',
      });
    } else {
      addExpense(formData);

      // Show add notification with different messages for income vs expense
      notifications.show({
        title: formData.type === 'income' ? "Income Added! 💰" : "Expense Added! 📝",
        message: `${formData.description} - $${formData.amount} saved successfully`,
        color: formData.type === 'income' ? "green" : "teal",
        autoClose: 4000,
        position: 'top-right',
      });
    }

    // Reset form
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
              { label: "Expenses", value: "expense" },
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