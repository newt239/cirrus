"use client";

import { useEffect } from "react";

import { Box, clsx } from "~/lib/mantine/core";

import { useAtom } from "jotai";

import Block from "~/components/features/preview/Block";
import { blocksAtom } from "~/store/jotai";
import { getBlocks } from "~/utils/db";

type Props = {
  project_id: string;
};

const Preview: React.FC<Props> = ({ project_id }) => {
  const [blocks, setBlocks] = useAtom(blocksAtom);

  useEffect(() => {
    if (blocks.length === 0) {
      getBlocks(project_id).then((r) => {
        if (r) {
          setBlocks(r);
        }
      });
    }
  }, []);

  return (
    <Box className={clsx("w-[600px]", "h-[400px]", "bg-black", "relative")}>
      {blocks.map((block) => (
        <Block block={block} key={block.id} />
      ))}
    </Box>
  );
};
export default Preview;
