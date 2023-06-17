"use client";

import { Box, clsx } from "~/libs/mantine/core";

import { useLiveQuery } from "dexie-react-hooks";

import Block from "~/components/features/preview/Block";
import { db } from "~/utils/dexie";

type Props = {
  project_id: string;
};

const Preview: React.FC<Props> = ({ project_id }) => {
  const blocks = useLiveQuery(() => db.blocks.where({ project_id }).toArray());

  if (!blocks) return null;

  return (
    <Box
      className={clsx(
        "w-[600px]",
        "h-[400px]",
        "bg-black",
        "relative",
        "overflow-hidden"
      )}
    >
      {blocks.map((block) => (
        <Block block={block} key={block.id} />
      ))}
    </Box>
  );
};
export default Preview;
