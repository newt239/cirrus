import { Box, Flex, Title } from "~/libs/mantine/core";

import SignIn from "../auth/SignIn";

const HomeHeader: React.FC = () => {
  return (
    <Box w="100%">
      <Flex align="center" justify="space-between" px="lg" py="xs">
        <Title order={1}>Cirrus</Title>
        <SignIn />
      </Flex>
    </Box>
  );
};

export default HomeHeader;
