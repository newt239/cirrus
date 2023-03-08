"use client";

import { Button, Title } from "@mantine/core";
import { useSetAtom } from "jotai";

import { sessionAtom } from "@/store/jotai";
import supabase from "@/utils/supabase";

const SignOut = () => {
  const setSession = useSetAtom(sessionAtom);

  const SignOut = async () => {
    const { error } = await supabase.auth.signOut();
    setSession(null);
  };

  return (
    <div>
      <Title order={2}>サインアウト</Title>
      <Button onClick={SignOut}>ログアウトする</Button>
    </div>
  );
};

export default SignOut;
