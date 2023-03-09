"use client";

import { useAtomValue } from "jotai";

import ProjectList from "@/components/block/ProjectList";
import { sessionAtom } from "@/store/jotai";

const Home: React.FC = () => {
  const session = useAtomValue(sessionAtom);

  return <main>{session && <ProjectList />}</main>;
};

export default Home;
