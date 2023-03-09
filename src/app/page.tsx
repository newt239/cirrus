"use client";

import { useAtomValue } from "jotai";

import AppHeader from "@/components/block/AppHeader";
import ProjectList from "@/components/block/ProjectList";
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
