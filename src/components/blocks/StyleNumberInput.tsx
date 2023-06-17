import { useEffect, useState } from "react";

import { NumberInput } from "~/libs/mantine/core";

import { BlockDBProps } from "~/types/db";
import { updateStyle } from "~/utils/db";

type Props = {
  type: "initial_style" | "final_style";
  style_name: string;
  min: number;
  max: number;
  precision: number;
  initial: number;
  block: BlockDBProps;
};

const StyleNumberInput: React.FC<Props> = ({
  type,
  style_name,
  min,
  max,
  precision,
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
      max={max}
      min={min}
      onChange={(v) => setNumberValue(v)}
      precision={precision}
      size="xs"
      step={Math.pow(10, -precision)}
      value={numberValue}
    />
  );
};

export default StyleNumberInput;
