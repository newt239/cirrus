import { Session } from "@supabase/auth-helpers-nextjs";
import { atom } from "jotai";

import { BlockDBProps } from "@/types/db";

export const sessionAtom = atom<Session | null>(null);

export const blocksAtom = atom<BlockDBProps[]>([]);

export const currentBlockIdAtom = atom<string | null>(null);

export const currentBlockAtom = atom((get) => {
  const currentBlock = get(blocksAtom).find(
    (block) => block.id === get(currentBlockIdAtom)
  );
  return currentBlock ? currentBlock : null;
});
