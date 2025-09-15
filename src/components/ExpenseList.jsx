import { Card, Table, Group, Button, Select, TextInput, Stack } from "@mantine/core";
import { CATEGORIES } from "../utils/constants";
import { Edit2, Trash2 } from "lucide-react";

export default function ExpenseList({ filteredExpenses, categoryFilter, setCategoryFilter, dateRange, setDateRange, startEdit, deleteExpense }) {
  return (
    <Stack>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Group grow>
          <Select
            label="Filter by Category"
            placeholder="All"
            data={["", ...CATEGORIES]}
            value={categoryFilter}
            onChange={setCategoryFilter}
          />
          <TextInput
            label="Start Date"
            type="date"
            value={dateRange.start}
            onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
          />
          <TextInput
            label="End Date"
            type="date"
            value={dateRange.end}
            onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
          />
        </Group>
      </Card>

      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Table highlightOnHover>
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
            {filteredExpenses.length > 0 ? (
              filteredExpenses.map((expense) => (
                <Table.Tr key={expense.id}>
                  <Table.Td>{expense.description}</Table.Td>
                                    <Table.Td
  style={{
    color: expense.type === "income" ? "green" : "red",
    fontWeight: 600
  }}
>
  {expense.type === "income" ? `+${expense.amount.toFixed(2)}` : `-${expense.amount.toFixed(2)}`}
</Table.Td>
                  {/* <Table.Td>${expense.amount.toFixed(2)}</Table.Td> */}
                  <Table.Td>{expense.category}</Table.Td>
                  <Table.Td>{expense.date}</Table.Td>

                  <Table.Td>
                    <Group spacing="xs">
                      <Button size="xs" color="darkgreen" onClick={() => startEdit(expense)}>
                        <Edit2 size={16} />
                      </Button>
                      <Button size="xs" color="darkred" onClick={() => deleteExpense(expense.id)}>
                        <Trash2 size={16} />
                      </Button>
                    </Group>
                  </Table.Td>
                </Table.Tr>
              ))
            ) : (
              <Table.Tr>
                <Table.Td colSpan={5} style={{ textAlign: "center" }}>
                  No expenses found.
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      </Card>
    </Stack>
  );
}
