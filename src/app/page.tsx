"use client";

import { useAtomValue } from "jotai";

import ProjectList from "@/components/features/dashboard/ProjectList";
import AppHeader from "@/components/features/header/AppHeader";
import { sessionAtom } from "@/store/jotai";

const Home: React.FC = () => {
  const session = useAtomValue(sessionAtom);

  return (
    <div>
      <AppHeader />
      {session && <ProjectList />}
    </div>
  );
};

export default Home;
