"use client";

import { usePathname } from "next/navigation";

import { AppShell, Header, MantineProvider } from "~/lib/mantine/core";

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
