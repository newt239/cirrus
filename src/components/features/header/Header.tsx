"use client";

import { usePathname } from "next/navigation";

import { Header as MantineHeader } from "~/libs/mantine/core";

import DashboardHeader from "./DashboardHeader";
import HomeHeader from "./HomeHeader";
import StudioHeader from "./StudioHeader";

const Header: React.FC = () => {
  const pathname = usePathname();

  return (
    <MantineHeader height="auto" zIndex={1}>
      {pathname === "/" ? (
        <HomeHeader />
      ) : pathname === "/dashboard" ? (
        <DashboardHeader />
      ) : (
        <StudioHeader />
      )}
    </MantineHeader>
  );
};

export default Header;
