"use client";

import { usePathname } from "next/navigation";

import {
  AppShell,
  Box,
  Flex,
  Header,
  MantineProvider,
  Navbar,
  ScrollArea,
} from "~/lib/mantine/core";

import { ModalsProvider } from "@mantine/modals";

import SideBar from "../sidebar/SideBar";

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
        components: {
          Button: {
            styles: {
              root: {
                fontWeight: "inherit",
              },
            },
          },
        },
      }}
      withCSSVariables
      withGlobalStyles
      withNormalizeCSS
    >
      <ModalsProvider>
        <Flex direction="column" h="100vh">
          <Header height="auto">
            {pathname === "/" ? (
              <HomeHeader />
            ) : pathname === "/dashboard" ? (
              <DashboardHeader />
            ) : (
              <StudioHeader />
            )}
          </Header>
          <Flex h="100%">
            {pathname !== "/" && pathname !== "/dashboard" ? (
              <Navbar
                fixed={false}
                p="xs"
                position={{ top: 0, left: 0 }}
                width={{ base: 300 }}
                zIndex={1}
              >
                <Navbar.Section component={ScrollArea} grow mx="-xs" px="xs">
                  <SideBar />
                </Navbar.Section>
              </Navbar>
            ) : undefined}
            <ScrollArea
              h="100%"
              sx={(theme) => ({
                backgroundColor: theme.colors.gray[1],
              })}
              w="100%"
            >
              {children}
            </ScrollArea>
          </Flex>
        </Flex>
      </ModalsProvider>
    </MantineProvider>
  );
};

export default Wrapper;
