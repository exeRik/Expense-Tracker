import { Card, SimpleGrid } from "@mantine/core";
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { groupExpensesByCategory, groupExpensesByDate } from "../utils/expenseUtils";

export default function ExpenseCharts({ expenses, COLORS }) {
  const categoryData = Object.entries(groupExpensesByCategory(expenses)).map(([category, amount]) => ({ name: category, value: amount }));
  const dateData = Object.entries(groupExpensesByDate(expenses)).map(([date, amount]) => ({ date, amount }));

  return (
    <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
              {categoryData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </Card>

      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={dateData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="amount" stroke="#24551aff" />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <Card shadow="sm" padding="lg" radius="md"  width="100%" withBorder>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={categoryData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value">
              {categoryData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </SimpleGrid>
  );
}
