import { useEffect, useState } from "react";

import { ColorInput, TextInput } from "~/libs/mantine/core";

import { StyleVarsProps } from "~/libs/cssStyleVars";
import { BlockDBProps } from "~/types/db";
import { updateStyle } from "~/utils/db";

type Props = {
  type: "initial_style" | "final_style";
  style_name: string;
  initial: string;
  component_type: Omit<StyleVarsProps["component"], "number">;
  block: BlockDBProps;
};

const StyleInput: React.FC<Props> = ({
  type,
  style_name,
  initial,
  component_type,
  block,
}) => {
  const [value, setValue] = useState<string | null>(null);

  useEffect(() => {
    setValue(initial);
  }, [block.id]);

  useEffect(() => {
    if (value && value !== initial) {
      updateStyle(`${block.id}_${style_name}`, type, value);
    }
  }, [value]);

  switch (component_type) {
    case "text":
      return (
        <TextInput
          onChange={(v) => setValue(v.target.value)}
          value={value ? value : ""}
          w="100%"
        />
      );
    case "color":
      return (
        <ColorInput
          onChange={(v) => setValue(v)}
          size="xs"
          value={value ? value : ""}
        />
      );
    default:
      return null;
  }
};

export default StyleInput;
