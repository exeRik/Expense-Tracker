import { Stack, Title, Text } from "@mantine/core";
import { rem } from "@mantine/core";

export default function Header() {
  return (
    <Stack align="center" mb="xl">
      <Title order={1} size={rem(48)} ta="center" c="dark.8">
        💰 Expense Tracker
      </Title>
      <Text size="lg" c="dimmed" ta="center">
        Track, visualize, and manage your expenses
      </Text>
    </Stack>
  );
}
