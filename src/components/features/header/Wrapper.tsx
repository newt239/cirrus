"use client";

import { usePathname } from "next/navigation";

import {
  AppShell,
  Header,
  MantineProvider,
  Navbar,
  ScrollArea,
} from "~/lib/mantine/core";

import Menus from "../menus/Menus";

import DashboardHeader from "./DashboardHeader";
import HomeHeader from "./HomeHeader";
import StudioHeader from "./StudioHeader";

type Props = {
  children: React.ReactNode;
};

const Wrapper = ({ children }: Props) => {
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
              <HomeHeader />
            ) : pathname === "/dashboard" ? (
              <DashboardHeader />
            ) : (
              <StudioHeader />
            )}
          </Header>
        }
        navbar={
          pathname !== "/" && pathname !== "/dashboard" ? (
            <Navbar
              fixed={false}
              p="xs"
              position={{ top: 0, left: 0 }}
              width={{ base: 300 }}
            >
              <Navbar.Section component={ScrollArea} grow mx="-xs" px="xs">
                <Menus />
              </Navbar.Section>
            </Navbar>
          ) : undefined
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
