import { Table, Badge, Card, Group, Select, Grid, Alert, Text } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { IconEdit, IconTrash, IconFilter } from "@tabler/icons-react";
import { CATEGORIES, CHART_COLORS } from "../utils/constants";
import { inputStyles, cardStyles } from "../utils/themes";

const ExpenseList = ({ expenses, deleteExpense, startEdit, categoryFilter, setCategoryFilter, dateRange, setDateRange }) => {
  const getCategoryColor = category => {
    const index = CATEGORIES.findIndex(cat => cat.value === category);
    return CHART_COLORS[index % CHART_COLORS.length];
  };

  const ActionButtons = ({ expenseId, expenseData }) => (
    <Group spacing="xs">
      <IconEdit size={16} color="blue" style={{ cursor: "pointer" }} onClick={() => startEdit(expenseData)} />
      <IconTrash size={16} color="red" style={{ cursor: "pointer" }} onClick={() => deleteExpense(expenseId)} />
    </Group>
  );

  return (
    <Card shadow="md" padding="xl" radius="lg" style={cardStyles} withBorder>
      <Group justify="space-between" mb="lg">
        <Group>
          <IconFilter size={24} color="green" />
          <Text weight={700} size="lg">Expense List</Text>
        </Group>
        <Badge size="lg" variant="outline">{expenses.length} expenses</Badge>
      </Group>

      {/* Filters */}
      <Grid mb="xl">
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Select label="Filter by Category" placeholder="All Categories" value={categoryFilter} onChange={setCategoryFilter} data={CATEGORIES} clearable styles={inputStyles} />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 4 }}>
          <DateInput label="Start Date" value={dateRange.start} onChange={v => setDateRange({ ...dateRange, start: v })} clearable styles={inputStyles} />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 4 }}>
          <DateInput label="End Date" value={dateRange.end} onChange={v => setDateRange({ ...dateRange, end: v })} clearable styles={inputStyles} />
        </Grid.Col>
      </Grid>

      {expenses.length === 0 ? (
        <Alert variant="light" color="blue" title="No expenses found">
          Add some expenses to get started with tracking your spending!
        </Alert>
      ) : (
        <Table striped highlightOnHover>
          <thead>
            <tr>
              <th>Description</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map(exp => (
              <tr key={exp.id}>
                <td>{exp.description}</td>
                <td style={{ color: "green", fontWeight: 600 }}>${exp.amount.toFixed(2)}</td>
                <td><Badge color={getCategoryColor(exp.category)} variant="light">{exp.category}</Badge></td>
                <td>{new Date(exp.date).toLocaleDateString()}</td>
                <td><ActionButtons expenseId={exp.id} expenseData={exp} /></td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Card>
  );
};

export default ExpenseList;
