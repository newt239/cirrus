"use client";

import { useState } from "react";

import { ActionIcon, TextInput } from "~/lib/mantine/core";

import { IconPlus } from "@tabler/icons-react";
import { useSetAtom } from "jotai";

import { cssPropertyInfo } from "~/lib/cssPropertyInfo";
import { blocksAtom } from "~/store/jotai";
import { BlockProps } from "~/types/db";
import supabase from "~/utils/supabase";

type Props = {
  block: BlockProps;
};
const AddStyleForm: React.FC<Props> = ({ block }) => {
  const [value, setValue] = useState("");
  const setBlocks = useSetAtom(blocksAtom);

  const addStyle = async () => {
    const propertyInfo = cssPropertyInfo[value as keyof typeof cssPropertyInfo];
    if (
      value !== "" &&
      propertyInfo &&
      Object.keys(cssPropertyInfo).includes(value)
    ) {
      setBlocks((blocks) =>
        blocks.map((b) => {
          if (b.id === block.id) {
            return {
              ...b,
              initial_style: {
                ...b.initial_style,
                [value]: propertyInfo.default.toString(),
              },
              final_style: {
                ...b.final_style,
                [value]: propertyInfo.default.toString(),
              },
            };
          } else {
            return b;
          }
        })
      );
      await supabase.from("styles").insert({
        id: `${block.id}-${value}`,
        block_id: block.id,
        key: value,
        initial_value: propertyInfo.default.toString(),
        final_value: propertyInfo.default.toString(),
      });
      setValue("");
    }
  };

  return (
    <TextInput
      label="スタイルを追加"
      onChange={(v) => setValue(v.target.value)}
      rightSection={
        <ActionIcon
          disabled={
            value === "" ||
            !Object.keys(cssPropertyInfo).includes(value) ||
            Object.keys(block.initial_style).includes(value)
          }
          onClick={addStyle}
        >
          <IconPlus />
        </ActionIcon>
      }
      value={value}
    />
  );
};

export default AddStyleForm;
