"use client";

import { useEffect } from "react";

import { BlockDBProps, StyleDBProps } from "~/types/db";
import { db } from "~/utils/dexie";

type Props = {
  blocks: BlockDBProps[];
  styles: StyleDBProps[];
};

const UpdateData: React.FC<Props> = ({ blocks, styles }) => {
  useEffect(() => {
    const updateLocalDB = async () => {
      if (blocks) await db.blocks.bulkPut(blocks);
      if (styles) await db.styles.bulkPut(styles);
    };
    updateLocalDB();
  }, [blocks, styles]);

  return null;
};

export default UpdateData;
