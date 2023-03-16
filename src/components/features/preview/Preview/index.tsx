"use client";

import { useEffect } from "react";

import { useAtom } from "jotai";

import useStyles from "./styles";

import Block from "@/components/features/preview/Block";
import { blocksAtom } from "@/store/jotai";
import { getBlocks } from "@/utils/db";

type Props = {
  project_id: string;
};

const Preview = ({ project_id }: Props) => {
  const { classes } = useStyles();
  const [blocks, setBlocks] = useAtom(blocksAtom);

  useEffect(() => {
    getBlocks(project_id).then((r) => {
      if (r) {
        setBlocks(r);
      }
    });
  });

  return (
    <div className={classes.preview_container}>
      {blocks.map((block) => (
        <Block key={block.id} block={block} />
      ))}
    </div>
  );
};
export default Preview;
