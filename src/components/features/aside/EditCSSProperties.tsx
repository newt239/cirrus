"use client";

import { CSSProperties, memo } from "react";

import { ActionIcon, Box, Flex, Text } from "~/libs/mantine/core";

import { IconTrash } from "@tabler/icons-react";
import { useSetAtom } from "jotai";

import PropertyInput from "~/components/blocks/PropertyInput";
import PropertyNumberInput from "~/components/blocks/PropertyNumberInput";
import { cssPropertyInfo } from "~/libs/cssPropertyInfo";
import { blocksAtom } from "~/store/jotai";
import { BlockProps } from "~/types/db";
import supabase from "~/utils/supabase";

type Props = {
  property: keyof CSSProperties;
  block: BlockProps;
};

const EditCSSProperties: React.FC<Props> = ({ property, block }) => {
  const propertyInfo = cssPropertyInfo[property];
  const setBlocks = useSetAtom(blocksAtom);

  if (!propertyInfo) return null;

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

  // eslint-disable-next-line react/display-name
  const Input: React.FC<{ type: "initial" | "final" }> = memo(({ type }) => {
    if (propertyInfo.component === "number") {
      return (
        <PropertyNumberInput
          block={block}
          property_name={property}
          type={type}
        />
      );
    } else {
      return (
        <PropertyInput
          block={block}
          component_type={propertyInfo.component}
          property_name={property}
          type={type}
        />
      );
    }
  });

  return (
    <>
      <Flex align="center" justify="space-between">
        <Text fz="sm">{propertyInfo.label}</Text>
        <ActionIcon onClick={deleteProperty} size="xs">
          <IconTrash />
        </ActionIcon>
      </Flex>
      <Flex gap="xs">
        <Input type="initial" />
        {block.change && propertyInfo.change && (
          <>
            <Box>→</Box>
            <Input type="final" />
          </>
        )}
      </Flex>
    </>
  );
};

export default EditCSSProperties;
