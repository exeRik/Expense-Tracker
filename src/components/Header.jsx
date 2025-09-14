import { Center, Stack, Title, Text } from "@mantine/core";

const Header = () => (
  <Center mb="xl">
    <Stack align="center" gap="xs">
      <Title order={1} c="" size="4rem">
        💰 Expense Tracker
      </Title>
      <Text c="" size="lg">
        Track, visualize, and manage your daily expenses
      </Text>
    </Stack>
  </Center>
);

export default Header;
