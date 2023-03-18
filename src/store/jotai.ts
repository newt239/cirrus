import { Session } from "@supabase/auth-helpers-nextjs";
import { atom } from "jotai";

import { BlockDBProps } from "@/types/db";

export const sessionAtom = atom<Session | null>(null);

export const blocksAtom = atom<BlockDBProps[]>([]);

export const currentBlockIdAtom = atom<string | null>(null);

type CurrentBlockAtomArgTuple = {
  [T in keyof BlockDBProps]: [T, BlockDBProps[T]];
}[keyof BlockDBProps];

export const currentBlockAtom = atom(
  (get) => {
    const currentBlock = get(blocksAtom).find(
      (block) => block.id === get(currentBlockIdAtom)
    );
    return currentBlock ? currentBlock : null;
  },
  (get, set, value: CurrentBlockAtomArgTuple) => {
    const blocks = get(blocksAtom);
    const index = blocks.findIndex(
      (block) => block.id === get(currentBlockIdAtom)
    );
    set(
      blocksAtom,
      blocks.map((block, n) =>
        n === index ? { ...block, [value[0]]: value[1] } : block
      )
    );
  }
);
