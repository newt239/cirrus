"use client";

import { useEffect } from "react";

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
  });

  if (!blocks) return null;

  return (
    <div
      style={{
        width: 600,
        height: 400,
        backgroundColor: "black",
        position: "relative",
      }}
    >
      {blocks.map((block) => (
        <Block key={block.id} block={block} />
      ))}
    </div>
  );
};
export default Preview;