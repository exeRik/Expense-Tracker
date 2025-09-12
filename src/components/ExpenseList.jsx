import { Table, Badge, Card, Group, Select, Grid, Alert, Text } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { IconEdit, IconTrash, IconFilter } from "@tabler/icons-react";
import { CATEGORIES, CHART_COLORS } from "../utils/constants";
import { inputStyles, cardStyles } from "../utils/theme";

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

  // Filtered expenses
  const filteredExpenses = expenses.filter(exp => {
    const matchesCategory = categoryFilter ? exp.category === categoryFilter : true;
    const expDate = new Date(exp.date);
    const matchesStartDate = dateRange.start ? expDate >= dateRange.start : true;
    const matchesEndDate = dateRange.end ? expDate <= dateRange.end : true;
    return matchesCategory && matchesStartDate && matchesEndDate;
  });

  return (
    <Card shadow="md" padding="xl" radius="lg" style={cardStyles} withBorder >
      <Group justify="space-between" mb="lg">
        <Group>
          <IconFilter size={24} color="green" />
          <Text weight={700} size="lg">Expense List</Text>
        </Group>
        <Badge size="lg" variant="outline">{filteredExpenses.length} expenses</Badge>
      </Group>

      {/* Filters */}
      <Grid mb="xl">
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Select
            label="Filter by Category"
            placeholder="All Categories"
            value={categoryFilter}
            onChange={setCategoryFilter}
            data={CATEGORIES}
            clearable
            styles={inputStyles}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 4 }}>
          <DateInput
            label="Start Date"
            value={dateRange.start}
            onChange={v => setDateRange({ ...dateRange, start: v })}
            clearable
            styles={inputStyles}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 4 }}>
          <DateInput
            label="End Date"
            value={dateRange.end}
            onChange={v => setDateRange({ ...dateRange, end: v })}
            clearable
            styles={inputStyles}
          />
        </Grid.Col>
      </Grid>

      {filteredExpenses.length === 0 ? (
        <Alert variant="light" color="blue" title="No expenses found">
          Add some expenses to get started with tracking your spending!
        </Alert>
      ) : (
        <Table
  striped
  highlightOnHover
  style={{ width: "100%", tableLayout: "fixed" }} // fixed layout ensures alignment
>
  <colgroup>
    <col style={{ width: "30%" }} /> {/* Description */}
    <col style={{ width: "20%" }} /> {/* Amount */}
    <col style={{ width: "30%" }} /> {/* Category */}
    <col style={{ width: "25%" }} /> {/* Date */}
    <col style={{ width: "10%" }} /> {/* Actions */}
  </colgroup>

  <thead>
    <tr>
      <th style={{ textAlign: "left" }}>Description</th>
      <th style={{ textAlign: "right" }}>Amount</th>
      <th style={{ textAlign: "center" }}>Category</th>
      <th style={{ textAlign: "center" }}>Date</th>
      <th style={{ textAlign: "left" }}>Actions</th>
    </tr>
  </thead>

  <tbody>
    {filteredExpenses.map(exp => (
      <tr key={exp.id}>
        <td style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{exp.description}</td>
        <td style={{ color: "green", fontWeight: 600, textAlign: "right" }}>${exp.amount.toFixed(2)}</td>
        <td style={{ textAlign: "center" }}>
          <Badge color={getCategoryColor(exp.category)} variant="light">{exp.category}</Badge>
        </td>
        <td style={{ textAlign: "center" }}>{new Date(exp.date).toLocaleDateString()}</td>
        <td style={{ textAlign: "center" }}>
          <ActionButtons expenseId={exp.id} expenseData={exp} />
        </td>
      </tr>
    ))}
  </tbody>
</Table>

      )}
    </Card>
  );
};

export default ExpenseList;
