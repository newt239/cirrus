import { Suspense } from "react";

import { Box, Flex, Title } from "~/libs/mantine/core";

import { useAtomValue } from "jotai";

import Account from "../auth/Account";
import SignIn from "../auth/SignIn";

import { sessionAtom } from "~/store/jotai";

const DashboardHeader: React.FC = () => {
  const session = useAtomValue(sessionAtom);
  return (
    <Box w="100%">
      <Flex align="center" justify="space-between" px="lg" py="xs">
        <Title order={1}>Cirrus</Title>
        <Suspense fallback={<SignIn />}>
          {session ? <Account /> : <SignIn />}
        </Suspense>
      </Flex>
    </Box>
  );
};

export default DashboardHeader;
