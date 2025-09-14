import { useState, useEffect } from "react";
import { Card, Grid, TextInput, NumberInput, Select, Button, Group, Title } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { IconPlus } from "@tabler/icons-react";
import { CATEGORIES } from "../utils/constants";
import { inputStyles, cardStyles } from "../utils/theme";

const ExpenseForm = ({ addExpense, updateExpense, editingExpense, cancelEdit }) => {
  const [formData, setFormData] = useState({
    description: "",
    amount: null,
    category: "",
    date: new Date(),
  });

  useEffect(() => {
    if (editingExpense) {
      setFormData({ ...editingExpense, date: new Date(editingExpense.date) });
    }
  }, [editingExpense]);

  const handleChange = (field, value) => setFormData({ ...formData, [field]: value });

  const handleSubmit = () => {
    if (!formData.description || !formData.amount || !formData.category) return;
    if (editingExpense) {
      updateExpense(editingExpense.id, formData);
      cancelEdit();
    } else {
      addExpense(formData);
      setFormData({ description: "", amount: null, category: "", date: new Date() });
    }
  };

  const fields = [
    { component: TextInput, props: { label: "Description", placeholder: "Enter description", value: formData.description, onChange: e => handleChange("description", e.currentTarget.value) } },
    { component: NumberInput, props: { label: "Amount ($)", placeholder: "0.00", value: formData.amount, onChange: v => handleChange("amount", v ?? 0), decimalScale: 2, fixedDecimalScale: true, min: 0 } },
    { component: Select, props: { label: "Category", placeholder: "Select category", value: formData.category, onChange: v => handleChange("category", v), data: CATEGORIES, clearable: true } },
    { component: DateInput, props: { label: "Date", value: formData.date, onChange: v => handleChange("date", v || new Date()) } },
  ];

  return (
    <Card shadow="md" padding="xl" radius="lg" style={cardStyles} withBorder>
      <Group mb="lg">
        <IconPlus size={24} />
        <Title order={2}>{editingExpense ? "Edit Expense" : "Add New Expense"}</Title>
      </Group>

      <Grid>
        {fields.map(({ component: Component, props }, idx) => (
          <Grid.Col key={idx} span={{ base: 12, md: 6, lg: 3 }}>
            <Component {...props} withAsterisk styles={inputStyles} />
          </Grid.Col>
        ))}

        <Grid.Col span={12}>
          <Group>
            <Button onClick={handleSubmit} leftSection={<IconPlus size={16} color="darkgreen" />}>
              {editingExpense ? "Update Expense" : "Add Expense"}
            </Button>
            {editingExpense && <Button variant="outline" color="darkgreen" onClick={cancelEdit}>Cancel</Button>}
          </Group>
        </Grid.Col>
      </Grid>
    </Card>
  );
};

export default ExpenseForm;
