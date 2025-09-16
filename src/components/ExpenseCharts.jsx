import { Card, SimpleGrid, Title, Text, SegmentedControl, Stack, Group, Badge, Box } from "@mantine/core";
import { useState } from "react";
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from "recharts";
import { groupExpensesByCategory, groupExpensesByDate, getTotalByType } from "../utils/expenseUtils";

export default function ExpenseCharts({ expenses, COLORS }) {
  const [activeType, setActiveType] = useState("expense");

  // Filter data based on selected type
  const categoryData = Object.entries(groupExpensesByCategory(expenses, activeType)).map(([category, amount]) => ({ 
    name: category, 
    value: amount 
  }));

  const dateData = Object.entries(groupExpensesByDate(expenses, activeType)).map(([date, amount]) => ({ 
    date, 
    amount 
  }));

  // Get totals for display
  const incomeTotal = getTotalByType(expenses, "income");
  const expenseTotal = getTotalByType(expenses, "expense");

  // Enhanced colors for different chart types
  const pieColors = [
    "#357e48ff", "#82ca9d", "#c99325ff", "#ff7c7c", "#8dd1e1", 
    "#d084d0", "#ffb347", "#87ceeb", "#98fb98", "#ff6b6b",
    "#4ecdc4", "#45b7d1", "#f9ca24", "#6c5ce7", "#a29bfe"
  ];

  const lineColor = activeType === "income" ? "#05561bff" : "#841212ff";
  const barColor = activeType === "income" ? "#319d5bff" : "#9e721bff";

  // Custom tooltip for better formatting
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <Box p="sm" bg="white" style={{ border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
          <Text size="sm" weight={500}>{label}</Text>
          <Text size="sm" color={activeType === "income" ? "green" : "red"}>
            Amount: RS.{payload[0].value.toFixed(2)}
          </Text>
          {payload[0].payload.percentage && (
            <Text size="xs" color="dimmed">
              {payload[0].payload.percentage}% of total
            </Text>
          )}
        </Box>
      );
    }
    return null;
  };

  // Add percentage to pie chart data
  const totalAmount = categoryData.reduce((sum, item) => sum + item.value, 0);
  const enhancedCategoryData = categoryData.map(item => ({
    ...item,
    percentage: ((item.value / totalAmount) * 100).toFixed(1)
  }));

  // Custom pie chart label
  const renderCustomPieLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, value, index, name }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    const percentage = ((value / totalAmount) * 100).toFixed(1);

    if (percentage > 5) { // Only show label if slice is bigger than 5%
      return (
        <text 
          x={x} 
          y={y} 
          fill="white" 
          textAnchor={x > cx ? 'start' : 'end'} 
          dominantBaseline="central"
          fontSize="12"
          fontWeight="600"
        >
          {`${percentage}%`}
        </text>
      );
    }
  };

  return (
    <Stack spacing="lg">
      {/* Header with totals and type selector */}
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Group justify="space-between" align="center">
          <Group>
            <Title order={3} color={activeType === "income" ? "green.9" : "red.9"}>
              {activeType === "income" ? "Income Analytics" : "Expense Analytics"}
            </Title>
            <Badge size="lg" variant="light" color={activeType === "income" ? "green.9" : "red.9"}>
              RS.{(activeType === "income" ? incomeTotal : expenseTotal).toFixed(2)}
            </Badge>
          </Group>
          
          <SegmentedControl
            value={activeType}
            onChange={setActiveType}
            data={[
              { label: " Income", value: "income" },
              { label: "Expenses", value: "expense" }
            ]}
            size="sm"
            radius="md"
            color={activeType === "income" ? "green.9" : "red.9"}
          />
        </Group>
      </Card>

      {/* Charts Grid */}
      <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
        {/* Pie Chart */}
        <Card shadow="md" padding="lg" radius="md" withBorder>
          <Stack spacing="md">
            <Group justify="space-between">
              <Title order={4} color={activeType === "income" ? "green.9" : "red.9"}>
                {activeType === "income" ? "Income" : "Expense"} Distribution
              </Title>
              <Text size="sm" color="dimmed">
                {categoryData.length} categories
              </Text>
            </Group>

            {categoryData.length > 0 ? (
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie 
                    data={enhancedCategoryData} 
                    dataKey="value" 
                    nameKey="name" 
                    cx="50%" 
                    cy="50%" 
                    outerRadius={120}
                    innerRadius={40}
                    labelLine={false}
                    label={renderCustomPieLabel}
                  >
                    {enhancedCategoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend 
                    verticalAlign="bottom" 
                    height={36}
                    formatter={(value, entry) => (
                      <span style={{ color: entry.color, fontSize: '12px' }}>
                        {value} (RS.{entry.payload.value.toFixed(2)})
                      </span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div style={{ height: 350, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                <Text color="dimmed" mt="xs">No {activeType} data available</Text>
              </div>
            )}
          </Stack>
        </Card>

        {/* Line Chart */}
        <Card shadow="md" padding="lg" radius="md" withBorder>
          <Stack spacing="md">
            <Group justify="space-between">
              <Title order={4} color={activeType === "income" ? "green.9" : "red.9"}>
                {activeType === "income" ? "Income" : "Expense"} Trends
              </Title>
              <Text size="sm" color="dimmed">
                Over time analysis
              </Text>
            </Group>

            {dateData.length > 0 ? (
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={dateData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 12 }}
                    stroke="#666"
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }}
                    stroke="#666"
                    tickFormatter={(value) => `RS.${value}`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line 
                    type="monotone" 
                    dataKey="amount" 
                    stroke={lineColor} 
                    strokeWidth={3}
                    dot={{ fill: lineColor, strokeWidth: 2, r: 6 }}
                    activeDot={{ r: 8, fill: lineColor }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div style={{ height: 350, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                <Text color="dimmed" mt="xs">No {activeType} timeline data</Text>
              </div>
            )}
          </Stack>
        </Card>

        {/* Bar Chart - Full Width */}
        <Card shadow="md" padding="lg" radius="md" withBorder style={{ gridColumn: "1 / -1" }}>
          <Stack spacing="md">
            <Group justify="space-between">
              <Title order={4} color={activeType === "income" ? "green.9" : "red.9"}>
                 {activeType === "income" ? "Income" : "Expense"} by Category (Detailed View)
              </Title>
              <Group>
                <Text size="sm" color="dimmed">
                  Total: RS.{(activeType === "income" ? incomeTotal : expenseTotal).toFixed(2)}
                </Text>
                <Badge variant="light" color={activeType === "income" ? "green" : "red"}>
                  {categoryData.length} categories
                </Badge>
              </Group>
            </Group>

            {categoryData.length > 0 ? (
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={categoryData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fontSize: 12, angle: -45, textAnchor: 'end' }}
                    stroke="#666"
                    height={80}
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }}
                    stroke="#666"
                    tickFormatter={(value) => `RS.${value}`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div style={{ height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                <Text color="dimmed" mt="xs">No {activeType} category data available</Text>
              </div>
            )}
          </Stack>
        </Card>
      </SimpleGrid>

    </Stack>
  );
}