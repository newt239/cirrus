"use client";

import { useState } from "react";

import { ActionIcon, TextInput } from "~/lib/mantine/core";

import { IconPlus } from "@tabler/icons-react";

import { cssPropertyInfo } from "~/lib/cssPropertyInfo";
import { BlockProps } from "~/types/db";
import supabase from "~/utils/supabase";

type Props = {
  block: BlockProps;
};
const AddStyleForm: React.FC<Props> = ({ block }) => {
  const [value, setValue] = useState("");

  const addStyle = async () => {
    const propertyInfo = cssPropertyInfo[value as keyof typeof cssPropertyInfo];
    if (
      value !== "" &&
      propertyInfo &&
      Object.keys(cssPropertyInfo).includes(value)
    ) {
      await supabase.from("styles").insert({
        block_id: block.id,
        key: value,
        value: propertyInfo.default.toString(),
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
