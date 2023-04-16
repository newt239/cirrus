"use client";

import { Box, Button, List, Title } from "~/lib/mantine/core";

import { useAtom, useAtomValue } from "jotai";

import { blocksAtom, currentBlockIdAtom } from "~/store/jotai";

const Timeline: React.FC = () => {
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
              disabled={currentBlockId === block.id}
              onClick={() => setBlockId(block.id)}
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
