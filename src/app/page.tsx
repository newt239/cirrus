"use client";

import { Suspense, useEffect } from "react";

import { useAtom } from "jotai";

import SignIn from "@/components/features/auth/SignIn/SignIn";
import SignOut from "@/components/features/auth/SignOut/SignOut";
import { sessionAtom } from "@/store/jotai";
import supabase from "@/utils/supabase";

export default function Home() {
  const [session, setSession] = useAtom(sessionAtom);

  useEffect(() => {
    supabase.auth.getSession().then((r) => {
      if (r.data.session) {
        setSession(r.data.session);
      }
    });
  }, []);

  return (
    <main>
      <Suspense fallback={<SignIn />}>
        {session ? <SignOut /> : <SignIn />}
      </Suspense>
    </main>
  );
}
