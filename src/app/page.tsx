"use client";

import { useEffect } from "react";

import { useAtom } from "jotai";

import ProjectList from "@/components/features/dashboard/ProjectList";
import AppHeader from "@/components/features/header/AppHeader";
import Hero from "@/components/features/home/Hero";
import { sessionAtom } from "@/store/jotai";
import supabase from "@/utils/supabase";

const Home: React.FC = () => {
  const [session, setSession] = useAtom(sessionAtom);

  useEffect(() => {
    supabase.auth.getSession().then((r) => {
      setSession(r.data.session);
    });
  }, []);

  return (
    <div>
      <AppHeader />
      {session ? <ProjectList /> : <Hero />}
    </div>
  );
};

export default Home;
