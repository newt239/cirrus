import { useEffect, useState } from "react";

import { NumberInput } from "~/libs/mantine/core";

import { BlockDBProps } from "~/types/db";
import { updateStyle } from "~/utils/db";

type Props = {
  type: "initial_style" | "final_style";
  style_name: string;
  initial: number;
  block: BlockDBProps;
};

const StyleNumberInput: React.FC<Props> = ({
  type,
  style_name,
  initial,
  block,
}) => {
  const [numberValue, setNumberValue] = useState<number | "">("");

  useEffect(() => {
    setNumberValue(initial);
  }, [block.id]);

  useEffect(() => {
    if (block && numberValue) {
      updateStyle(`${block.id}_${style_name}`, type, numberValue.toString());
    }
  }, [numberValue]);

  return (
    <NumberInput
      onChange={(v) => setNumberValue(v)}
      size="xs"
      value={numberValue}
    />
  );
};

export default StyleNumberInput;
