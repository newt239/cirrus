"use client";

import { useAtom, useAtomValue } from "jotai";

import { Box, Button, List, Title } from "@/lib/mantine/core";
import { blocksAtom, currentBlockIdAtom } from "@/store/jotai";

const Timeline = () => {
  const blocks = useAtomValue(blocksAtom);
  const [currentBlockId, setCurrentBlockId] = useAtom(currentBlockIdAtom);

  const setBlockId = (block_id: string) => {
    setCurrentBlockId(block_id);
  };

  return (
    <Box p="sm">
      <Title order={3}>ブロック一覧</Title>
      <List>
        {blocks.map((block) => (
          <List.Item key={block.id}>
            {block.id}
            <Button
              onClick={() => setBlockId(block.id)}
              disabled={currentBlockId === block.id}
            >
              選択
            </Button>
          </List.Item>
        ))}
      </List>
    </Box>
  );
};
export default Timeline;
