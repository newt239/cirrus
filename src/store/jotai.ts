import { Session } from "@supabase/auth-helpers-nextjs";
import { atom } from "jotai";

import { styleVars } from "~/libs/cssStyleVars";
import { BlockDBProps, StyleDBProps } from "~/types/db";
import supabase from "~/utils/supabase";

export const sessionAtom = atom<Session | null>(null);

export const blocksAtom = atom<BlockDBProps[]>([]);

export const stylesAtom = atom<StyleDBProps[]>([]);

export const currentBlockIdAtom = atom<string | null>(null);

export const currentBlockAtom = atom((get) => {
  const currentBlock = get(blocksAtom).find(
    (block) => block.id === get(currentBlockIdAtom)
  );
  return currentBlock ? currentBlock : null;
});

export const currentBlockStylesAtom = atom((get) => {
  const blockId = get(currentBlockIdAtom);
  const styles = get(stylesAtom);
  if (blockId) {
    return styles.filter((style) => style.block_id === blockId);
  } else return [];
});

export const updateStartTimeAtom = atom(
  null,
  async (get, set, value: [string, number]) => {
    const blocks = get(blocksAtom);
    await supabase
      .from("blocks")
      .update({ start: value[1] })
      .match({ id: value[0] });
    const newBlocks = blocks.map((block) => {
      if (block.id === value[0]) {
        return { ...block, start: value[1] };
      } else return block;
    });
    set(blocksAtom, newBlocks);
  }
);

export const updateDurationAtom = atom(
  null,
  async (get, set, value: [string, number]) => {
    const blocks = get(blocksAtom);
    await supabase
      .from("blocks")
      .update({ duration: value[1] })
      .match({ id: value[0] });
    const newBlocks = blocks.map((block) => {
      if (block.id === value[0]) {
        return { ...block, duration: value[1] };
      } else return block;
    });
    set(blocksAtom, newBlocks);
  }
);

type SetBlockAtomArgTuple = ["add", BlockDBProps] | ["delete", string];

export const setBlockAtom = atom(
  null,
  async (get, set, value: SetBlockAtomArgTuple) => {
    const blocks = get(blocksAtom);
    const styles = get(stylesAtom);
    if (value[0] === "add") {
      const initial_style: { [T in keyof gsap.TweenVars]: string } = {};
      const final_style: { [T in keyof gsap.TweenVars]: string } = {};
      const newBlocks = [
        ...blocks,
        { ...value[1], initial_style, final_style },
      ];
      set(blocksAtom, newBlocks);
    } else {
      const newStyles = await styles.filter(async (style) => {
        if (style.block_id === value[1]) {
          await supabase.from("styles").delete().match({ id: style.id });
          return false;
        } else return true;
      });
      set(stylesAtom, newStyles);
      const newBlocks = blocks.filter((block) => block.id !== value[1]);
      set(blocksAtom, newBlocks);
    }
  }
);

type SetStyleAtomArg = {
  block_id: string;
  key: keyof gsap.TweenVars;
};

export const addStyleAtom = atom(
  null,
  async (get, set, value: SetStyleAtomArg) => {
    const styles = get(stylesAtom);
    const styleInfo = styleVars[value.key];
    const newStyle = {
      id: `${value.block_id}-${value.key}`,
      created_at: new Date().toISOString(),
      block_id: value.block_id,
      key: value.key.toString(),
      initial_style: styleInfo.default.toString(),
      final_style: styleInfo.default.toString(),
      change: styleInfo.change,
      available: true,
    };
    await supabase.from("styles").insert(newStyle);
    set(stylesAtom, [...styles, newStyle]);
  }
);

type UpdateStyleAtomArg = {
  block_id: string;
  key: keyof gsap.TweenVars;
  type: "initial" | "final";
  value: string;
};

export const updateStyleAtom = atom(
  null,
  async (get, set, value: UpdateStyleAtomArg) => {
    const styles = get(stylesAtom);
    const newStyles = await Promise.all(
      styles.map(async (style) => {
        if (style.block_id === value.block_id && style.key === value.key) {
          const newStyle = {
            ...style,
            [`${value.type}_style`]: value.value,
          };
          await supabase
            .from("styles")
            .update(newStyle)
            .match({ id: style.id });
          return newStyle;
        } else return style;
      })
    );
    set(stylesAtom, newStyles);
  }
);

export const deleteStyleAtom = atom(
  null,
  (get, set, value: SetStyleAtomArg) => {
    const styles = get(stylesAtom);
    const newStyles = styles.filter((style) => {
      if (style.block_id === value.block_id && style.key === value.key) {
        supabase.from("styles").delete().eq("id", style.id);
        return false;
      } else return true;
    });
    set(stylesAtom, newStyles);
  }
);

export const updateAvailabilityAtom = atom(
  null,
  async (get, set, value: string) => {
    const styles = get(stylesAtom);
    const newStyles = await Promise.all(
      styles.map(async (style) => {
        if (style.block_id === value) {
          const newStyle = {
            ...style,
            available: !style.available,
          };
          await supabase
            .from("styles")
            .update(newStyle)
            .match({ id: style.id });
          return newStyle;
        } else return style;
      })
    );
    set(stylesAtom, newStyles);
  }
);
