import { Session } from "@supabase/auth-helpers-nextjs";
import { atom } from "jotai";

import { BlockDBProps, BlockProps } from "~/types/db";
import supabase from "~/utils/supabase";

export const sessionAtom = atom<Session | null>(null);

export const blocksAtom = atom<BlockProps[]>([]);

export const currentBlockIdAtom = atom<string | null>(null);

type CurrentBlockAtomArgTuple =
  | {
      [T in keyof BlockDBProps]: [T, BlockDBProps[T]];
    }[keyof BlockDBProps]
  | ["initial_style", keyof gsap.TweenVars, string]
  | ["final_style", keyof gsap.TweenVars, string];

export const currentBlockAtom = atom(
  (get) => {
    const currentBlock = get(blocksAtom).find(
      (block) => block.id === get(currentBlockIdAtom)
    );
    return currentBlock ? currentBlock : null;
  },
  async (get, set, value: CurrentBlockAtomArgTuple) => {
    const blocks = get(blocksAtom);
    const index = blocks.findIndex(
      (block) => block.id === get(currentBlockIdAtom)
    );
    const newBlocks = await Promise.all(
      blocks.map(async (block, n) => {
        if (n === index) {
          if (value[0] === "initial_style") {
            await supabase
              .from("styles")
              .update({ value: value[2] })
              .match({ block_id: block.id, key: value[1], type: "initial" });
            return {
              ...block,
              initial_style: {
                ...block.initial_style,
                [value[1]]: value[2],
              },
            };
          } else if (value[0] === "final_style") {
            await supabase.from("styles").update({ value: value[2] }).match({
              block_id: block.id,
              key: value[1],
              type: "final",
            });
            return {
              ...block,
              final_style: {
                ...block.final_style,
                [value[1]]: value[2],
              },
            };
          } else {
            await supabase
              .from("blocks")
              .update({ [value[0]]: value[1] })
              .match({
                id: block.id,
              });
            return { ...block, [value[0]]: value[1] };
          }
        } else return block;
      })
    );
    set(blocksAtom, newBlocks);
  }
);
