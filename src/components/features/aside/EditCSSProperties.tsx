"use client";

import { CSSProperties, useEffect, useState } from "react";

import {
  ActionIcon,
  Box,
  ColorInput,
  Flex,
  NumberInput,
  Text,
  TextInput,
} from "~/lib/mantine/core";

import { IconTrash } from "@tabler/icons-react";
import { useAtom, useSetAtom } from "jotai";

import { cssPropertyInfo } from "~/lib/cssPropertyInfo";
import { blocksAtom, currentBlockAtom } from "~/store/jotai";
import supabase from "~/utils/supabase";

type Props = {
  property: keyof CSSProperties;
};

const EditCSSProperties: React.FC<Props> = ({ property }) => {
  const propertyInfo = cssPropertyInfo[property];
  const [block, setProperty] = useAtom(currentBlockAtom);
  const setBlocks = useSetAtom(blocksAtom);
  const [initialStringValue, setInitialStringValue] = useState<
    string | undefined
  >(
    block && block.initial_style[property] ? block.initial_style[property] : ""
  );
  const [finalStringValue, setFinalStringValue] = useState<string | undefined>(
    block && block.final_style[property] ? block.final_style[property] : ""
  );
  const [initialNumberValue, setInitialNumberValue] = useState<number | "">(
    block && block.initial_style[property]
      ? Number(block.initial_style[property])
      : 0
  );
  const [finalNumberValue, setFinalNumberValue] = useState<number | "">(
    block && block.final_style[property]
      ? Number(block.final_style[property])
      : 0
  );

  useEffect(() => {
    const updateInitialValue = () => {
      if (
        block &&
        block.initial_style[property] !== initialStringValue &&
        initialStringValue
      ) {
        setProperty(["initial_style", property, initialStringValue]);
      }
    };
    updateInitialValue();
  }, [initialStringValue]);

  useEffect(() => {
    const updateFinalValue = () => {
      if (
        block &&
        block.final_style[property] !== finalStringValue &&
        finalStringValue
      ) {
        setProperty(["final_style", property, finalStringValue]);
      }
    };
    updateFinalValue();
  }, [finalStringValue]);

  if (!block || !propertyInfo) return null;

  const PropertyInput: React.FC<{ type: "initial" | "final" }> = ({ type }) => {
    switch (propertyInfo.component) {
      case "text":
        return (
          <TextInput
            onChange={(v) =>
              type === "initial"
                ? setInitialStringValue(v.target.value)
                : setFinalStringValue(v.target.value)
            }
            value={type === "initial" ? initialStringValue : finalStringValue}
          />
        );
      case "number":
        return (
          <NumberInput
            onChange={
              type === "initial" ? setInitialNumberValue : setFinalNumberValue
            }
            size="xs"
            value={type === "initial" ? initialNumberValue : finalNumberValue}
          />
        );
      case "color":
        return (
          <ColorInput
            onChange={
              type === "initial" ? setInitialStringValue : setFinalStringValue
            }
            size="xs"
            value={type === "initial" ? initialStringValue : finalStringValue}
          />
        );
      default:
        return null;
    }
  };

  const deleteProperty = async () => {
    setBlocks((blocks) =>
      blocks.map((b) => {
        if (b.id === block.id) {
          const initial_style: { [key in keyof CSSProperties]: string } = {};
          Object.keys(b.initial_style).map((key) => {
            if (key !== property) {
              initial_style[key as keyof CSSProperties] = b.initial_style[key];
            }
          });
          const final_style: { [key in keyof CSSProperties]: string } = {};
          Object.keys(b.final_style).map((key) => {
            if (key !== property) {
              final_style[key as keyof CSSProperties] = b.initial_style[key];
            }
          });
          return { ...b, initial_style, final_style };
        } else {
          return b;
        }
      })
    );
    await supabase
      .from("styles")
      .delete()
      .eq("block_id", block.id)
      .eq("key", property);
  };

  return (
    <>
      <Flex align="center" justify="space-between">
        <Text fz="sm">{propertyInfo.label}</Text>
        <ActionIcon onClick={deleteProperty} size="xs">
          <IconTrash />
        </ActionIcon>
      </Flex>
      <Flex gap="xs">
        <PropertyInput type="initial" />
        <Box>→</Box>
        <PropertyInput type="final" />
      </Flex>
    </>
  );
};

export default EditCSSProperties;
