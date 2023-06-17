/* eslint-disable @next/next/no-img-element */
"use client";

import {
  Accordion,
  ActionIcon,
  Aside,
  Box,
  Divider,
  Flex,
  Stack,
} from "~/libs/mantine/core";

import { IconTrash } from "@tabler/icons-react";
import { useLiveQuery } from "dexie-react-hooks";

import AddStyleInput from "./AddStyleInput";
import EditCSSStyleInput from "./EditCSSStyleInput";
import EditDuration from "./EditDuration";
import EditLayer from "./EditLayer";
import EditStartTime from "./EditStartTime";

import { StyleVarsProps } from "~/libs/cssStyleVars";
import { deleteBlock } from "~/utils/db";
import { db } from "~/utils/dexie";

type Props = {
  block_id: string;
};

const ASideBar: React.FC<Props> = ({ block_id }) => {
  const block = useLiveQuery(() => db.blocks.get(block_id));
  const styles = useLiveQuery(() => db.styles.where({ block_id }).toArray());
  const image = useLiveQuery(() => db.images.get(block_id));

  if (!block || !styles) return null;

  return (
    <Aside
      fixed={false}
      position={{ top: 0, right: 0 }}
      width={{ base: 500 }}
      zIndex={1}
    >
      <Aside.Section grow>
        <Accordion
          defaultValue={["block"]}
          multiple
          styles={{ label: { padding: "0.5rem", paddingLeft: 0 } }}
        >
          {block && (
            <Accordion.Item value="block">
              <Accordion.Control>選択中のブロック</Accordion.Control>
              <Accordion.Panel>
                <Stack spacing="xs">
                  <Flex gap="xs" justify="space-between">
                    <Box>{block.name}</Box>
                    <Box>
                      <ActionIcon
                        onClick={() => {
                          deleteBlock(block.id);
                        }}
                      >
                        <IconTrash />
                      </ActionIcon>
                    </Box>
                  </Flex>
                  {block.type === "image" && image && (
                    <Box>
                      <img
                        alt={block.name!}
                        decoding="async"
                        height={image.height}
                        src={image.source!}
                        width={image.width}
                      />
                    </Box>
                  )}
                  <EditLayer block={block} />
                  <Flex gap="xs">
                    <EditStartTime block={block} />
                    <EditDuration block={block} />
                  </Flex>
                  <Divider />
                  <AddStyleInput
                    block={block}
                    style_keys={styles.map((style) => style.key)}
                  />
                  {styles.map((style, i) => (
                    <EditCSSStyleInput
                      block={block}
                      key={i}
                      property={style.key as keyof StyleVarsProps}
                      style={style}
                    />
                  ))}
                </Stack>
              </Accordion.Panel>
            </Accordion.Item>
          )}
        </Accordion>
      </Aside.Section>
    </Aside>
  );
};

export default ASideBar;
