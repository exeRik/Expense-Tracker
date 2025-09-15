import { Card, Center, Group, Stack, Title, ThemeIcon, rem } from "@mantine/core";
export default function TotalCard({ totalExpenses }) {
  return (
    <Card shadow="md" padding="xl" radius="lg" mb="xl">
      <Center>
          <Stack spacing={4}>
            <Title order={2} c="dark.8">Total Expenses</Title>
            <Title order={1} size={rem(36)} c="green.9">
              RS.{totalExpenses.toFixed(2)}
            </Title>
          </Stack>
      </Center>
    </Card>
  );
}
