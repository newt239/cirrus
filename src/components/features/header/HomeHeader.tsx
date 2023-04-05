import { Flex, Title } from "~/lib/mantine/core";

import SignIn from "../auth/SignIn";

const HomeHeader: React.FC = () => {
  return (
    <Flex align="center" justify="space-between" w="100%">
      <Title order={1}>Cirrus</Title>
      <SignIn />
    </Flex>
  );
};

export default HomeHeader;
