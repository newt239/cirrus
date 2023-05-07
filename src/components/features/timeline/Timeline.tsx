"use client";

import { Box, Paper } from "~/libs/mantine/core";

import { useAtom, useAtomValue } from "jotai";

import { blocksAtom, currentBlockIdAtom } from "~/store/jotai";

const Timeline: React.FC = () => {
  const blocks = useAtomValue(blocksAtom);
  const [currentBlockId, setCurrentBlockId] = useAtom(currentBlockIdAtom);

  const setBlockId = (block_id: string) => {
    setCurrentBlockId(block_id);
  };

  return (
    <Box className="overflow-scroll" display="flex" h="100%" w="100%">
      <Box bg="gray.3" display="flex" h="150px" pos="relative" w="100%">
        {blocks.map((block) => (
          <Paper
            className="overflow-hidden whitespace-nowrap text-xs"
            component="button"
            h={30}
            key={block.id}
            left={block.start / 50}
            onClick={() => setBlockId(block.id)}
            pos="absolute"
            shadow="sm"
            top={block.layer * 30}
            w={block.duration / 50}
            withBorder
          >
            {block.name}
          </Paper>
        ))}
      </Box>
    </Box>
  );
};
export default Timeline;
