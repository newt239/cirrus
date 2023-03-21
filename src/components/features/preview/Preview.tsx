"use client";

import { useEffect } from "react";

import { Box } from "@mantine/core";
import { useAtom } from "jotai";

import Block from "@/components/features/preview/Block";
import { blocksAtom } from "@/store/jotai";
import { getBlocks } from "@/utils/db";

type Props = {
  project_id: string;
};

const Preview = ({ project_id }: Props) => {
  const [blocks, setBlocks] = useAtom(blocksAtom);

  useEffect(() => {
    getBlocks(project_id).then((r) => {
      if (r) {
        setBlocks(r);
      }
    });
  }, []);

  return (
    <Box
      sx={{
        width: 600,
        height: 400,
        backgroundColor: "black",
        position: "relative",
      }}
    >
      {blocks.map((block) => (
        <Block block={block} key={block.id} />
      ))}
    </Box>
  );
};
export default Preview;
