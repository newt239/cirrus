import { Suspense } from "react";

import { Flex, Title } from "~/lib/mantine/core";

import { useAtomValue } from "jotai";

import Account from "../auth/Account";
import SignIn from "../auth/SignIn";

import { sessionAtom } from "~/store/jotai";

const DashboardHeader: React.FC = () => {
  const session = useAtomValue(sessionAtom);
  return (
    <Flex align="center" justify="space-between" w="100%">
      <Title order={1}>Cirrus</Title>
      <Suspense fallback={<SignIn />}>
        {session ? <Account /> : <SignIn />}
      </Suspense>
    </Flex>
  );
};

export default DashboardHeader;
