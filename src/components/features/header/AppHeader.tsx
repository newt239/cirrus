"use client";

import { Suspense } from "react";

import { Box, Title } from "~/lib/mantine/core";

import { useAtomValue } from "jotai";

import Account from "~/components/features/auth/Account";
import SignIn from "~/components/features/auth/SignIn";
import { sessionAtom } from "~/store/jotai";

const AppHeader = () => {
  const session = useAtomValue(sessionAtom);

  return (
    <Box
      component="header"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 2rem",
        position: "sticky",
        top: 0,
        zIndex: 1100,
        backdropFilter: "blur(8px)",
        boxShadow: "inset 0px -1px 1px #e7ebf0",
        backgroundColor: "rgba(255,255,255,0.8)",
      }}
    >
      <Title order={1}>Cirrus</Title>
      <Suspense fallback={<SignIn />}>
        {session ? <Account /> : <SignIn />}
      </Suspense>
    </Box>
  );
};

export default AppHeader;
