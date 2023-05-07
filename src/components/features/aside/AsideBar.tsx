"use client";

import { useMemo } from "react";

import { Accordion, Aside, Divider, Flex, Stack } from "~/libs/mantine/core";

import { useAtomValue } from "jotai";

import AddStyleInput from "./AddStyleInput";
import EditCSSStyleInput from "./EditCSSStyleInput";
import EditDuration from "./EditDuration";
import EditLayer from "./EditLayer";
import EditStartTime from "./EditStartTime";

import { StyleVarsProps } from "~/libs/cssStyleVars";
import {
  currentBlockAtom,
  currentBlockIdAtom,
  currentBlockStylesAtom,
} from "~/store/jotai";

const ASideBar: React.FC = () => {
  const blockId = useAtomValue(currentBlockIdAtom);
  const block = useAtomValue(useMemo(() => currentBlockAtom, [blockId]));
  const styles = useAtomValue(useMemo(() => currentBlockStylesAtom, [blockId]));

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
        </Accordion>
      </Aside.Section>
    </Aside>
  );
};

export default ASideBar;
