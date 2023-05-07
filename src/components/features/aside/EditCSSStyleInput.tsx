"use client";

import { ActionIcon, Box, Flex, Text } from "~/libs/mantine/core";

import { IconEye, IconEyeOff, IconTrash } from "@tabler/icons-react";
import { useSetAtom } from "jotai";

import StyleInput from "~/components/blocks/StyleInput";
import PropertyNumberInput from "~/components/blocks/StyleNumberInput";
import { StyleVarsProps, styleVars } from "~/libs/cssStyleVars";
import { deleteStyleAtom, updateAvailabilityAtom } from "~/store/jotai";
import { BlockDBProps, StyleDBProps } from "~/types/db";

type Props = {
  property: keyof StyleVarsProps;
  block: BlockDBProps;
  style: StyleDBProps;
};

const EditCSSStyleInput: React.FC<Props> = ({ property, block, style }) => {
  const styleInfo = styleVars[property];
  const deleteStyle = useSetAtom(deleteStyleAtom);
  const updateAvailability = useSetAtom(updateAvailabilityAtom);

  // WIP: styleを一時的にオフにする
  const handleChangeAvailability = () => {
    updateAvailability(style.id);
  };

  const handleDeleteTrash = () => {
    deleteStyle({
      block_id: block.id,
      key: property,
    });
  };

  return (
    <>
      <Flex align="center" justify="space-between">
        <Text fz="sm">{styleInfo.label}</Text>
        <Flex align="right">
          <ActionIcon onClick={handleChangeAvailability} size="sm">
            {style.available ? <IconEye /> : <IconEyeOff />}
          </ActionIcon>
          <ActionIcon onClick={handleDeleteTrash} size="sm">
            <IconTrash />
          </ActionIcon>
        </Flex>
      </Flex>
      <Flex gap="xs">
        {styleInfo.component === "number" ? (
          <PropertyNumberInput
            block={block}
            initial={Number(style.initial_style)}
            style_name={property}
            type="initial"
          />
        ) : (
          <StyleInput
            block={block}
            component_type={styleInfo.component}
            initial={style.initial_style}
            style_name={property}
            type="initial"
          />
        )}
        {block.change && styleInfo.change && (
          <>
            <Box>→</Box>
            {styleInfo.component === "number" ? (
              <PropertyNumberInput
                block={block}
                initial={Number(style.final_style)}
                style_name={property}
                type="final"
              />
            ) : (
              <StyleInput
                block={block}
                component_type={styleInfo.component}
                initial={style.final_style}
                style_name={property}
                type="final"
              />
            )}
          </>
        )}
      </Flex>
    </>
  );
};

export default EditCSSStyleInput;
