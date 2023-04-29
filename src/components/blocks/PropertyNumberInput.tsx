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
  const initial = block ? Number(block.initial_style[property_name]) : "";
  const final = block ? Number(block.final_style[property_name]) : "";
  const [numberValue, setNumberValue] = useState<number | "" | null>(null);

  useEffect(() => {
    setNumberValue(type === "initial" ? initial : final);
  }, []);

  useEffect(() => {
    if (block && numberValue) {
      if (type === "initial" && initial !== numberValue) {
        setProperty(["initial_style", property_name, numberValue.toString()]);
      } else if (type === "final" && final !== numberValue) {
        setProperty(["final_style", property_name, numberValue.toString()]);
      }
    }
  }, [numberValue]);

  return (
    <NumberInput
      onChange={(v) => setNumberValue(v)}
      size="xs"
      value={numberValue ? numberValue : ""}
    />
  );
};

export default PropertyInput;
