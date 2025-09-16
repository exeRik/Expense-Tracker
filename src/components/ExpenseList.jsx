import { Card, Table, Group, Button, Select, TextInput, Stack, Text } from "@mantine/core";
import { notifications } from '@mantine/notifications';
import { useMemo } from 'react';
import { CATEGORIES } from "../utils/constants";
import { Edit2, Trash2, AlertTriangle, Check, X } from "lucide-react";

const FILTER_OPTIONS = ["", ...CATEGORIES];

export default function ExpenseList({ 
  filteredExpenses, 
  categoryFilter, 
  setCategoryFilter, 
  dateRange, 
  setDateRange, 
  startEdit, 
  deleteExpense 
}) {

  const categoryFilterData = useMemo(() => 
    FILTER_OPTIONS.map(cat => ({ value: cat, label: cat || "All Categories" })), 
    []
  );


  const handleDeleteWithConfirmation = (expense) => {
    const notificationId = `delete-${expense.id}`;
    
    notifications.show({
      id: notificationId,
      title: (
        <Group gap="xs">
          <AlertTriangle size={18} color="#7c1818ff" />
          <Text fw={600}>Confirm Deletion</Text>
        </Group>
      ),
      message: (
        <Stack gap="xs">
          <Text size="sm">
            Are you sure you want to delete this {expense.type}?
          </Text>
          <Text size="sm" fw={500} c={expense.type === "income" ? "green.9" : "red.9"}>
            {expense.description} :  RS.{expense.amount.toFixed(2)}
          </Text>
          <Group gap="sm" mt="xs">
            <Button
              size="xs"
              color="red.9"
              leftSection={<Check size={14} />}
              onClick={() => {
                notifications.hide(notificationId);
                deleteExpense(expense.id);
                

                notifications.show({
                  title: 'Entry Deleted! 🗑️',
                  message: `${expense.description} (RS.${expense.amount.toFixed(2)}) was deleted successfully`,
                  color: 'red.9',
                  autoClose: 3000,
                  position: 'top-right',
                });
              }}
            >
              Delete
            </Button>
            <Button
              size="xs"
              variant="light"
              color="gray"
              leftSection={<X size={14} />}
              onClick={() => notifications.hide(notificationId)}
            >
              Cancel
            </Button>
          </Group>
        </Stack>
      ),
      color: 'orange',
      autoClose: false,
      withCloseButton: true,
      position: 'top-center',
    });
  };


  const tableRows = useMemo(() => {
    if (filteredExpenses.length === 0) {
      return (
        <Table.Tr>
          <Table.Td colSpan={5} style={{ textAlign: "center", padding: "2rem", color: "#666" }}>
            No expenses found. Try adjusting your filters.
          </Table.Td>
        </Table.Tr>
      );
    }

    return filteredExpenses.map((expense) => (
      <Table.Tr key={expense.id}>
        <Table.Td>{expense.description}</Table.Td>
        <Table.Td
          style={{
            color: expense.type === "income" ? "#2d8f47" : "#c92a2a",
            fontWeight: 600
          }}
        >
          {expense.type === "income" 
            ? `+RS.${expense.amount.toFixed(2)}` 
            : `-RS.${expense.amount.toFixed(2)}`
          }
        </Table.Td>
        <Table.Td>{expense.category}</Table.Td>
        <Table.Td>{new Date(expense.date).toLocaleDateString()}</Table.Td>
        <Table.Td>
          <Group gap="xs">
            <Button 
              size="xs" 
              color="blue" 
              variant="light"
              onClick={() => startEdit(expense)}
              title="Edit entry"
            >
              <Edit2 size={16} />
            </Button>
            <Button 
              size="xs" 
              color="red" 
              variant="light"
              onClick={() => handleDeleteWithConfirmation(expense)}
              title="Delete entry"
            >
              <Trash2 size={16} />
            </Button>
          </Group>
        </Table.Td>
      </Table.Tr>
    ));
  }, [filteredExpenses, startEdit, handleDeleteWithConfirmation]);

  const handleDateRangeChange = (field, value) => {
    setDateRange(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Stack gap="lg">

      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Group grow>
          <Select
            label="Filter by Category"
            placeholder="All Categories"
            data={categoryFilterData}
            value={categoryFilter}
            onChange={setCategoryFilter}
            clearable
          />
          <TextInput
            label="Start Date"
            type="date"
            value={dateRange.start}
            onChange={(e) => handleDateRangeChange('start', e.target.value)}
          />
          <TextInput
            label="End Date"
            type="date"
            value={dateRange.end}
            onChange={(e) => handleDateRangeChange('end', e.target.value)}
          />
        </Group>
      </Card>

      {/* Expense Table */}
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Table highlightOnHover striped>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Description</Table.Th>
              <Table.Th>Amount</Table.Th>
              <Table.Th>Category</Table.Th>
              <Table.Th>Date</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {tableRows}
          </Table.Tbody>
        </Table>
      </Card>
    </Stack>
  );
}