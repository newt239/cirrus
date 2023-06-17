"use client";

import { useEffect } from "react";

import { BlockDBProps, ImageDBProps, StyleDBProps } from "~/types/db";
import { db } from "~/utils/dexie";

type Props = {
  blocks: BlockDBProps[];
  styles: StyleDBProps[];
  images: ImageDBProps[] | null;
};

const UpdateData: React.FC<Props> = ({ blocks, styles, images }) => {
  useEffect(() => {
    const updateLocalDB = async () => {
      if (blocks) await db.blocks.bulkPut(blocks);
      if (styles) await db.styles.bulkPut(styles);
      if (images) await db.images.bulkPut(images);
    };
    updateLocalDB();
  }, [blocks, styles]);

  return null;
};

export default UpdateData;
