"use client";

import { usePathname } from "next/navigation";

import {
  Aside,
  Flex,
  Header,
  MantineProvider,
  Navbar,
  ScrollArea,
} from "~/lib/mantine/core";

import { ModalsProvider } from "@mantine/modals";

import ASideBar from "../aside/AsideBar";
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
          <Header height="auto" zIndex={1}>
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
                position={{ top: 0, left: 0 }}
                width={{ base: 300 }}
                zIndex={1}
              >
                <Navbar.Section component={ScrollArea} grow>
                  <SideBar />
                </Navbar.Section>
              </Navbar>
            ) : undefined}
            <ScrollArea bg="gray.1" h="100%" w="100%">
              {children}
            </ScrollArea>
            {pathname !== "/" && pathname !== "/dashboard" ? (
              <Aside
                fixed={false}
                position={{ top: 0, right: 0 }}
                width={{ base: 500 }}
                zIndex={1}
              >
                <Aside.Section component={ScrollArea} grow>
                  <ASideBar />
                </Aside.Section>
              </Aside>
            ) : undefined}
          </Flex>
        </Flex>
      </ModalsProvider>
    </MantineProvider>
  );
};

export default Wrapper;
