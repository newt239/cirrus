"use client";

import { Suspense, useEffect } from "react";

import { useAtom } from "jotai";

import useStyles from "./styles";

import Account from "@/components/features/auth/Account";
import SignIn from "@/components/features/auth/SignIn";
import { Title } from "@/lib/mantine/core";
import { sessionAtom } from "@/store/jotai";
import supabase from "@/utils/supabase";

const AppHeader = () => {
  const { classes } = useStyles();
  const [session, setSession] = useAtom(sessionAtom);

  useEffect(() => {
    supabase.auth.getSession().then((r) => {
      setSession(r.data.session);
    });
  }, []);

  return (
    <header className={classes.header}>
      <Title order={1}>Cirrus</Title>
      <Suspense fallback={<SignIn />}>
        {session ? <Account /> : <SignIn />}
      </Suspense>
    </header>
  );
};

export default AppHeader;
