"use client";

import { List } from "@mantine/core";
import { useAtomValue } from "jotai";

import { blocksAtom } from "@/store/jotai";

const Timeline = () => {
  const blocks = useAtomValue(blocksAtom);

  return (
    <List>
      {blocks.map((block) => (
        <List.Item key={block.id}>
          {block.id} - {block.content}
        </List.Item>
      ))}
    </List>
  );
};
export default Timeline;
