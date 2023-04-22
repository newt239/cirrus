import { Flex, Title } from "~/libs/mantine/core";

import SignIn from "../auth/SignIn";

const HomeHeader: React.FC = () => {
  return (
    <Flex align="center" justify="space-between" px="lg" py="xs" w="100%">
      <Title order={1}>Cirrus</Title>
      <SignIn />
    </Flex>
  );
};

export default HomeHeader;
