"use client";

import { CSSProperties, useEffect, useState } from "react";

import { Accordion, Aside, Divider, Flex, Stack } from "~/libs/mantine/core";

import { useAtomValue } from "jotai";

import AddStyleForm from "./AddStyleForm";
import EditCSSProperties from "./EditCSSProperties";
import EditDuration from "./EditDuration";
import EditStartTime from "./EditStartTime";

import { currentBlockIdAtom } from "~/store/jotai";
import { BlockProps } from "~/types/db";
import { getBlock } from "~/utils/db";

const ASideBar: React.FC = () => {
  const blockId = useAtomValue(currentBlockIdAtom);
  const [block, setBlock] = useState<BlockProps | null>(null);

  useEffect(() => {
    const getCurrentBlock = async () => {
      if (blockId) {
        console.log(blockId);
        setBlock(await getBlock(blockId));
      } else {
        return null;
      }
    };
    getCurrentBlock();
  }, [blockId]);

  if (!block) return null;

  return (
    <Aside
      fixed={false}
      position={{ top: 0, right: 0 }}
      width={{ base: 500 }}
      zIndex={1}
    >
      <Aside.Section grow>
        <Accordion
          defaultValue={["asset", "history"]}
          multiple
          styles={{ label: { padding: "0.5rem", paddingLeft: 0 } }}
        >
          <Accordion.Item value="asset">
            <Accordion.Control>選択中のブロック</Accordion.Control>
            <Accordion.Panel>
              <Stack spacing="xs">
                <Flex gap="xs">
                  <EditStartTime block={block} />
                  <EditDuration block={block} />
                </Flex>
                <Divider />
                <AddStyleForm block={block} />
                {Object.keys(block.initial_style).map((property_name, i) => (
                  <EditCSSProperties
                    block={block}
                    key={i}
                    property={property_name as keyof CSSProperties}
                  />
                ))}
              </Stack>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </Aside.Section>
    </Aside>
  );
};

export default ASideBar;
