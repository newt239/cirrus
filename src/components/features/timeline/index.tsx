"use client";

import { useAtom, useAtomValue } from "jotai";

import { Button, List } from "@/lib/mantine/core";
import { blocksAtom, currentBlockIdAtom } from "@/store/jotai";

const Timeline = () => {
  const blocks = useAtomValue(blocksAtom);
  const [currentBlockId, setCurrentBlockId] = useAtom(currentBlockIdAtom);

  const setBlockId = (block_id: string) => {
    setCurrentBlockId(block_id);
  };

  return (
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
  );
};
export default Timeline;
