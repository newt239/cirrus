"use client";

import { usePathname } from "next/navigation";

import {
  Aside,
  Box,
  Flex,
  Header,
  Navbar,
  ScrollArea,
} from "~/lib/mantine/core";

import ASideBar from "../aside/AsideBar";
import SideBar from "../sidebar/SideBar";

import DashboardHeader from "./DashboardHeader";
import HomeHeader from "./HomeHeader";
import StudioHeader from "./StudioHeader";

type Props = {
  children: React.ReactNode;
};

const Wrapper: React.FC<Props> = ({ children }) => {
  const pathname = usePathname();

  return (
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
        <Box bg="gray.1" h="100%" w="100%">
          {children}
        </Box>
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
  );
};

export default Wrapper;
