"use client";

import { useAtomValue } from "jotai";

import ProjectList from "@/components/features/dashboard/ProjectList";
import AppHeader from "@/components/features/header/AppHeader";
import Hero from "@/components/features/home/Hero";
import { sessionAtom } from "@/store/jotai";

const Home: React.FC = () => {
  const session = useAtomValue(sessionAtom);

  return (
    <div>
      <AppHeader />
      {session ? <ProjectList /> : <Hero />}
    </div>
  );
};

export default Home;
