import { Card, Title, Grid, Center, Text, Stack } from "@mantine/core";
import { PieChart, BarChart, LineChart } from "@mantine/charts";
import { cardStyles } from "../utils/theme";

const Charts = ({ categoryData, timeData }) => {
  const pieData = Object.entries(categoryData).map(([category, value]) => ({ name: category, value }));
  const barData = pieData;
  const lineData = Object.entries(timeData)
    .sort(([a], [b]) => new Date(a) - new Date(b))
    .map(([date, amount]) => ({ date: new Date(date).toLocaleDateString(), amount }));

  if (pieData.length === 0) {
    return (
      <Card shadow="md" padding="xl" radius="lg" style={cardStyles} withBorder>
        <Center py="xl">
          <Text size="lg" c="dimmed">
            Add some expenses to see charts and analytics!
          </Text>
        </Center>
      </Card>
    );
  }

  // Generate colors: first slice green, rest black
  const pieColors = pieData.map((_, idx) => (idx === 0 ? "darkgreen.6" : "black"));

  const chartCards = [
    {
      title: "Expenses by Category",
      content: <PieChart data={pieData} size={300} withLabelsLine labelsPosition="outside" colors={pieColors} />,
      span: { base: 12, lg: 6 },
    },
    {
      title: "Category Comparison",
      content: <BarChart h={300} data={barData} dataKey="name" series={[{ name: "value", color: "darkgreen.6" }]} />,
      span: { base: 12, lg: 6 },
    },
    {
      title: "Spending Over Time",
      content: <LineChart h={300} data={lineData} dataKey="date" series={[{ name: "amount", color: "darkgreen.6" }]} withDots withLegend />,
      span: { base: 12 },
    },
  ];

  return (
    <Stack gap="xl">
      <Grid>
        {chartCards.map(({ title, content, span }, idx) => (
          <Grid.Col key={idx} span={span}>
            <Card shadow="md" padding="xl" radius="lg" style={cardStyles} withBorder>
              <Title order={3} mb="md">
                {title}
              </Title>
              {content}
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </Stack>
  );
};

export default Charts;
