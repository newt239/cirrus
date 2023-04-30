"use client";

import { useEffect } from "react";

import { Box, clsx } from "~/libs/mantine/core";

import { useAtom, useSetAtom } from "jotai";

import Block from "~/components/features/preview/Block";
import { blocksAtom, stylesAtom } from "~/store/jotai";
import { getBlocks } from "~/utils/db";

type Props = {
  project_id: string;
};

const Preview: React.FC<Props> = ({ project_id }) => {
  const [blocks, setBlocks] = useAtom(blocksAtom);
  const setStyles = useSetAtom(stylesAtom);

  useEffect(() => {
    if (blocks.length === 0) {
      getBlocks(project_id).then((r) => {
        if (r) {
          setBlocks(r.blocks);
          setStyles(r.styles);
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
