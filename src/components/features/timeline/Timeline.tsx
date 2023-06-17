"use client";

import Link from "next/link";

import { Box, Paper } from "~/libs/mantine/core";

import { useLiveQuery } from "dexie-react-hooks";

import { BlockDBProps } from "~/types/db";
import { db } from "~/utils/dexie";

type Props = {
  project_id: string;
  blocks: BlockDBProps[];
};

const Timeline: React.FC<Props> = ({ project_id }) => {
  const blocks = useLiveQuery(() => db.blocks.where({ project_id }).toArray());

  if (!blocks) return null;

  return (
    <Box className="overflow-scroll" display="flex" h="100%" w="100%">
      <Box bg="gray.3" display="flex" h="150px" pos="relative" w="100%">
        {blocks.map((block) => (
          <Link href={`/${project_id}/${block.id}`} key={block.id}>
            <Paper
              className="overflow-hidden whitespace-nowrap text-xs"
              component="button"
              h={30}
              left={block.start / 50}
              pos="absolute"
              shadow="sm"
              top={block.layer * 30}
              w={block.duration / 50}
              withBorder
            >
              {block.name}
            </Paper>
          </Link>
        ))}
      </Box>
    </Box>
  );
};
export default Timeline;
