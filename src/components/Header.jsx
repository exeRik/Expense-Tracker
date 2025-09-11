import { Center, Stack, Title, Text } from "@mantine/core";

const Header = () => (
  <Center mb="xl">
    <Stack align="center" gap="xs">
      <Title order={1} c="" size="3rem">
        💰 Expense Tracker
      </Title>
      <Text c="black" size="lg">
        Track, visualize, and manage your expenses with style
      </Text>
    </Stack>
  </Center>
);

export default Header;
