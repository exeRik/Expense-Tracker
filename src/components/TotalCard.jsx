import { Card, Center, Stack, Title, rem } from "@mantine/core";

export default function TotalCard({ totalExpenses }) {
  const isPositive = totalExpenses >= 0;

  return (
    <Card shadow="md" padding="xl" radius="lg" mb="xl">
      <Center>
        <Stack spacing={4}>
          <Title order={2} c="dark.8">
            Total Balance
          </Title>
          <Title order={1} size={rem(36)} c={isPositive ? "green.9" : "red.9"}>
            RS.{Math.abs(totalExpenses).toFixed(2)}
          </Title>
        </Stack>
      </Center>
    </Card>
  );
}
