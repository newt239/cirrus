/* eslint-disable @next/next/no-img-element */
"use client";

import { useRouter } from "next/navigation";

import {
  ActionIcon,
  Aside,
  Box,
  Divider,
  Flex,
  ScrollArea,
  Stack,
  Text,
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

const ASIBEBAR_WIDTH = 300;

type Props = {
  project_id: string;
  block_id: string;
};

const ASideBar: React.FC<Props> = ({ project_id, block_id }) => {
  const router = useRouter();
  const block = useLiveQuery(() => db.blocks.get(block_id));
  const styles = useLiveQuery(() => db.styles.where({ block_id }).toArray());
  const image = useLiveQuery(() => db.images.get(block_id));

  if (!block || !styles) return null;

  return (
    <Aside
      fixed={false}
      position={{ top: 0, right: 0 }}
      width={{ base: ASIBEBAR_WIDTH }}
      zIndex={1}
    >
      <Aside.Section grow>
        <ScrollArea h="85vh">
          {block && (
            <Box p="xs">
              <Stack spacing="xs">
                <Flex gap="xs" justify="space-between">
                  <Box>{block.name}</Box>
                  <Box>
                    <ActionIcon
                      onClick={() => {
                        deleteBlock(block.id);
                        router.push(`/${project_id}`);
                      }}
                    >
                      <IconTrash />
                    </ActionIcon>
                  </Box>
                </Flex>
                {block.type === "image" && image && (
                  <Flex align="center" direction="column">
                    <img
                      alt={block.name!}
                      decoding="async"
                      src={image.source!}
                      width={Math.min(image.width, ASIBEBAR_WIDTH - 50)}
                    />
                    <Text>
                      {image.width} x {image.height}
                    </Text>
                  </Flex>
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
            </Box>
          )}
        </ScrollArea>
      </Aside.Section>
    </Aside>
  );
};

export default ASideBar;
