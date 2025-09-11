import { Card, Group, Stack, Text } from "@mantine/core";
import { IconCurrencyDollar } from "@tabler/icons-react";

const TotalCard = ({ total }) => (
  <Card shadow="md" padding="xl" radius="lg" mb="xl" style={{ backgroundColor: '#abb3c328', color: '#000000ff' }} withBorder>
    <Group justify="center" gap="md">
      <IconCurrencyDollar size={40} color="green" />
      <Stack gap={0} align="center">
        <Text size="xl" fw={700} c="dark">
          Total Expenses
        </Text>
        <Text size="2.5rem" fw={900} c="darkgreen">
          ${total.toFixed(2)}
        </Text>
      </Stack>
    </Group>
  </Card>
);

export default TotalCard;
