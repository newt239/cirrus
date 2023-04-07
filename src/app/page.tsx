"use client";

import { useEffect } from "react";

import { useSetAtom } from "jotai";

import Hero from "~/components/features/home/Hero";
import { sessionAtom } from "~/store/jotai";
import supabase from "~/utils/supabase";

const Home: React.FC = () => {
  const setSession = useSetAtom(sessionAtom);

  useEffect(() => {
    supabase.auth.getSession().then((r) => {
      setSession(r.data.session);
    });
  }, []);

  return <Hero />;
};

export default Home;
