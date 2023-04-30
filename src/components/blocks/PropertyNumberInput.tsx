import { useEffect, useState } from "react";

import { NumberInput } from "~/libs/mantine/core";

import { useSetAtom } from "jotai";

import { setPropertyAtom } from "~/store/jotai";
import { BlockProps } from "~/types/db";

type Props = {
  type: "initial" | "final";
  property_name: string;
  block: BlockProps;
};

const PropertyInput: React.FC<Props> = ({ type, property_name, block }) => {
  const setProperty = useSetAtom(setPropertyAtom);
  const [numberValue, setNumberValue] = useState<number | "">("");

  useEffect(() => {
    if (numberValue === "" && block) {
      console.log("aa");
      const initial = block ? block.initial_style[property_name] : "";
      const final = block ? block.final_style[property_name] : "";
      const newValue = type === "initial" ? initial : final;
      setNumberValue(Number(newValue));
    }
  }, []);

  useEffect(() => {
    if (block && numberValue) {
      setProperty([`${type}_style`, property_name, numberValue]);
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

export default PropertyInput;
