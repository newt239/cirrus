"use client";

import { usePathname } from "next/navigation";
import { Suspense } from "react";

import {
  Title,
  AppShell,
  Navbar,
  Header,
  Flex,
  MantineProvider,
} from "~/lib/mantine/core";

import { useAtomValue } from "jotai";

import StudioHeader from "./StudioHeader";

import Account from "~/components/features/auth/Account";
import SignIn from "~/components/features/auth/SignIn";
import { sessionAtom } from "~/store/jotai";

type Props = {
  children: React.ReactNode;
};

const Wrapper = ({ children }: Props) => {
  const session = useAtomValue(sessionAtom);
  const pathname = usePathname();

  return (
    <MantineProvider
      theme={{
        fontFamily:
          '"LINESeedJP", "Noto Sans JP", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
      }}
    >
      <AppShell
        header={
          <Header display="flex" height={70} px="lg" py="sm">
            {pathname === "/" ? (
              <Flex align="center" justify="space-between" w="100%">
                <Title order={1}>Cirrus</Title>
                <Suspense fallback={<SignIn />}>
                  {session ? <Account /> : <SignIn />}
                </Suspense>
              </Flex>
            ) : (
              <StudioHeader />
            )}
          </Header>
        }
        navbar={
          <Navbar
            fixed={false}
            p="xs"
            position={{ top: 0, left: 0 }}
            width={{ base: 200 }}
          >
            Hello
          </Navbar>
        }
        padding="md"
        styles={(theme) => ({
          main: {
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          },
        })}
      >
        {children}
      </AppShell>
    </MantineProvider>
  );
};

export default Wrapper;
