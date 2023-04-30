import { useEffect, useState } from "react";

import { ColorInput, TextInput } from "~/libs/mantine/core";

import { useSetAtom } from "jotai";

import { PropertyInfo } from "~/libs/cssPropertyInfo";
import { setPropertyAtom } from "~/store/jotai";
import { BlockProps } from "~/types/db";

type Props = {
  type: "initial" | "final";
  property_name: string;
  component_type: Omit<PropertyInfo["component"], "number">;
  block: BlockProps;
};

const PropertyInput: React.FC<Props> = ({
  type,
  property_name,
  component_type,
  block,
}) => {
  const setProperty = useSetAtom(setPropertyAtom);
  const [value, setValue] = useState<string | null>(null);

  useEffect(() => {
    if (!value && block) {
      console.log("hey");
      const initial = block ? block.initial_style[property_name] : "";
      const final = block ? block.final_style[property_name] : "";
      const newValue = type === "initial" ? initial : final;
      setValue(newValue);
    }
  }, []);

  useEffect(() => {
    if (block && value) {
      setProperty([`${type}_style`, property_name, value]);
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

export default PropertyInput;
