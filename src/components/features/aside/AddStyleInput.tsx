"use client";

import { useState } from "react";

import { ActionIcon, TextInput } from "~/libs/mantine/core";

import { IconPlus } from "@tabler/icons-react";

import { styleVars } from "~/libs/cssStyleVars";
import { BlockDBProps } from "~/types/db";
import { addStyle } from "~/utils/db";

type Props = {
  block: BlockDBProps;
  style_keys: string[];
};

const AddStyleInput: React.FC<Props> = ({ block, style_keys }) => {
  const [value, setValue] = useState("");

  const handleClick = async () => {
    const styleInfo = styleVars[value as keyof typeof styleVars];
    if (value !== "" && styleInfo && Object.keys(styleVars).includes(value)) {
      await addStyle(block.id, value);
      setValue("");
    }
  };

  return (
    <TextInput
      onChange={(v) => setValue(v.target.value)}
      placeholder="スタイルを追加"
      rightSection={
        <ActionIcon
          disabled={
            value === "" ||
            !Object.keys(styleVars).includes(value) ||
            style_keys.includes(value)
          }
          onClick={handleClick}
          variant="gradient"
        >
          <IconPlus />
        </ActionIcon>
      }
      value={value}
      variant="filled"
    />
  );
};

export default AddStyleInput;
