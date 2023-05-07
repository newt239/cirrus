import { useEffect, useState } from "react";

import { ColorInput, TextInput } from "~/libs/mantine/core";

import { useSetAtom } from "jotai";

import { StyleVarsProps } from "~/libs/cssStyleVars";
import { updateStyleAtom } from "~/store/jotai";
import { BlockDBProps } from "~/types/db";

type Props = {
  type: "initial" | "final";
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
  const updateStyle = useSetAtom(updateStyleAtom);
  const [value, setValue] = useState<string | null>(null);

  useEffect(() => {
    setValue(initial);
  }, [block.id]);

  useEffect(() => {
    if (value && value !== initial) {
      updateStyle({
        block_id: block.id,
        key: style_name,
        type,
        value,
      });
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
