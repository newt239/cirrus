"use client";

import { ActionIcon, Box, Flex, Text } from "~/libs/mantine/core";

import { IconEye, IconEyeOff, IconTrash } from "@tabler/icons-react";
import { useSetAtom } from "jotai";

import StyleInput from "~/components/blocks/StyleInput";
import PropertyNumberInput from "~/components/blocks/StyleNumberInput";
import { StyleVarsProps, styleVars } from "~/libs/cssStyleVars";
import { updateAvailabilityAtom } from "~/store/jotai";
import { BlockDBProps, StyleDBProps } from "~/types/db";
import { deleteStyle } from "~/utils/db";

type Props = {
  property: keyof StyleVarsProps;
  block: BlockDBProps;
  style: StyleDBProps;
};

const EditCSSStyleInput: React.FC<Props> = ({ property, block, style }) => {
  const styleInfo = styleVars[property];
  const updateAvailability = useSetAtom(updateAvailabilityAtom);

  // WIP: styleを一時的にオフにする
  const handleChangeAvailability = () => {
    updateAvailability(style.id);
  };

  const handleDeleteTrash = async () => {
    await deleteStyle(style.id);
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
            type="initial_style"
          />
        ) : (
          <StyleInput
            block={block}
            component_type={styleInfo.component}
            initial={style.initial_style}
            style_name={property}
            type="initial_style"
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
                type="final_style"
              />
            ) : (
              <StyleInput
                block={block}
                component_type={styleInfo.component}
                initial={style.final_style}
                style_name={property}
                type="final_style"
              />
            )}
          </>
        )}
      </Flex>
    </>
  );
};

export default EditCSSStyleInput;
