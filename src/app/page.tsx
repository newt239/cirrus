"use client";

import { useEffect } from "react";

import { useAtom } from "jotai";

import ProjectList from "~/components/features/dashboard/ProjectList";
import Hero from "~/components/features/home/Hero";
import { sessionAtom } from "~/store/jotai";
import supabase from "~/utils/supabase";

const Home: React.FC = () => {
  const [session, setSession] = useAtom(sessionAtom);

  useEffect(() => {
    supabase.auth.getSession().then((r) => {
      setSession(r.data.session);
    });
  }, []);

  return <>{session ? <ProjectList /> : <Hero />}</>;
};

export default Home;
