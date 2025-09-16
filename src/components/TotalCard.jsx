import { Card, Group, Stack, Title, Text, rem } from "@mantine/core";

export default function TotalCard({ totalIncome, totalExpense }) {
  const balance = totalIncome - totalExpense;
  const isPositive = balance >= 0;
  
  // Format currency with commas
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NP', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  return (
    <Card shadow="md" padding="xl" radius="lg" mb="xl" withBorder>
      <Stack spacing="lg">
        {/* Balance */}
        <div style={{ textAlign: 'center' }}>
          <Text size="sm" color="dimmed" mb="xs">Total Balance</Text>
          <Title 
            order={1} 
            size={rem(36)} 
            color={isPositive ? "green.7" : "red.7"}
          >
            RS.{formatCurrency(Math.abs(balance))}
          </Title>
        </div>

        {/* Income and Expenses */}
        <Group justify="space-around">
          <div style={{ textAlign: 'center' }}>
            <Text size="sm" color="dimmed">Income</Text>
            <Title order={3} color="green.6">
              RS.{formatCurrency(totalIncome)}
            </Title>
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <Text size="sm" color="dimmed">Expenses</Text>
            <Title order={3} color="red.6">
              RS.{formatCurrency(totalExpense)}
            </Title>
          </div>
        </Group>
      </Stack>
    </Card>
  );
}