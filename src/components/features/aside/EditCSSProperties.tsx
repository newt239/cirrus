"use client";

import { CSSProperties, useEffect, useState } from "react";

import { Box, ColorInput, Divider, Flex } from "~/lib/mantine/core";

import { useAtom } from "jotai";

import { cssPropertyInfo } from "~/lib/cssPropertyInfo";
import { currentBlockAtom } from "~/store/jotai";

type Props = {
  property: keyof CSSProperties;
};

const EditCSSProperties: React.FC<Props> = ({ property }) => {
  const propertyInfo = cssPropertyInfo[property];
  const [block, setProperty] = useAtom(currentBlockAtom);
  const [initialValue, setInitialValue] = useState(
    block && block.initial_style[property] ? block.initial_style[property] : ""
  );
  const [finalValue, setFinalValue] = useState(
    block && block.final_style[property] ? block.final_style[property] : ""
  );

  useEffect(() => {
    const updateInitialValue = () => {
      if (block && block.initial_style[property] !== initialValue) {
        setProperty(["initial_style", property, initialValue || ""]);
      }
    };
    updateInitialValue();
  }, [initialValue]);

  useEffect(() => {
    const updateFinalValue = () => {
      if (block && block.final_style[property] !== finalValue) {
        setProperty(["final_style", property, initialValue || ""]);
      }
    };
    updateFinalValue();
  }, [finalValue]);

  if (!block || !propertyInfo) return null;

  const PropertyInput: React.FC<{ type: "initial" | "final" }> = ({ type }) => {
    switch (propertyInfo.component) {
      case "color":
        return (
          <ColorInput
            onChange={type === "initial" ? setInitialValue : setFinalValue}
            size="xs"
            value={type === "initial" ? initialValue : finalValue}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Divider label={propertyInfo.label} />
      <Flex gap="xs">
        <PropertyInput type="initial" />
        <Box>→</Box>
        <PropertyInput type="final" />
      </Flex>
    </>
  );
};

export default EditCSSProperties;
