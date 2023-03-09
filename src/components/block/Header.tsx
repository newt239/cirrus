"use client";

import { Suspense, useEffect } from "react";

import { Title } from "@mantine/core";
import { useAtom } from "jotai";

import Account from "../features/auth/Account";
import SignIn from "../features/auth/SignIn";

import useStyles from "./Header.styles";

import { sessionAtom } from "@/store/jotai";
import supabase from "@/utils/supabase";

const Header = () => {
  const { classes } = useStyles();
  const [session, setSession] = useAtom(sessionAtom);

  useEffect(() => {
    supabase.auth.getSession().then((r) => {
      setSession(r.data.session);
    });
  }, []);

  return (
    <header className={classes.header}>
      <Title order={1}>midmotion</Title>
      <Suspense fallback={<SignIn />}>
        {session ? <Account /> : <SignIn />}
      </Suspense>
    </header>
  );
};

export default Header;
