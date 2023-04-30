import { useEffect, useState } from "react";

import { NumberInput } from "~/libs/mantine/core";

import { useSetAtom } from "jotai";

import { updateStyleAtom } from "~/store/jotai";
import { BlockDBProps } from "~/types/db";

type Props = {
  type: "initial" | "final";
  style_name: string;
  initial_value: number;
  block: BlockDBProps;
};

const StyleNumberInput: React.FC<Props> = ({
  type,
  style_name,
  initial_value,
  block,
}) => {
  const updateStyle = useSetAtom(updateStyleAtom);
  const [numberValue, setNumberValue] = useState<number | "">("");

  useEffect(() => {
    setNumberValue(initial_value);
  }, [block.id]);

  useEffect(() => {
    if (block && numberValue) {
      updateStyle({
        block_id: block.id,
        key: style_name,
        type,
        value: numberValue.toString(),
      });
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
