"use client";

import { Box, clsx } from "~/libs/mantine/core";

import Block from "~/components/features/preview/Block";
import { BlockDBProps } from "~/types/db";

type Props = {
  blocks: BlockDBProps[];
};

const Preview: React.FC<Props> = ({ blocks }) => {
  return (
    <Box className={clsx("w-[600px]", "h-[400px]", "bg-black", "relative")}>
      {blocks.map((block) => (
        <Block block={block} key={block.id} />
      ))}
    </Box>
  );
};
export default Preview;
