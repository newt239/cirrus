import { CSSProperties } from "react";

import { Session } from "@supabase/auth-helpers-nextjs";
import { atom } from "jotai";

import { cssPropertyInfo } from "~/lib/cssPropertyInfo";
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
          if (value[0] === "initial_style" || value[0] === "final_style") {
            if (
              [...Object.keys(cssPropertyInfo), "textContent"].includes(
                value[1] as string
              )
            ) {
              const style_type =
                value[0] === "initial_style" ? "initial_style" : "final_style";
              await supabase.from("styles").upsert({
                id: `${block.id}-${value[1]}`,
                block_id: block.id,
                key: value[1] as keyof CSSProperties,
                [style_type]: value[2],
              });
              return {
                ...block,
                [style_type]: {
                  ...block[style_type],
                  [value[1]]: value[2],
                },
              };
            } else return block;
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
