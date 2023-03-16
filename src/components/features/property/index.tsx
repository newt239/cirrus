"use client";

import { useAtomValue } from "jotai";

import { currentBlockAtom } from "@/store/jotai";

const Property = () => {
  const block = useAtomValue(currentBlockAtom);

  if (!block) return null;

  return <div></div>;
};
export default Property;
