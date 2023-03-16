"use client";

import { List, Title } from "@mantine/core";
import { useAtomValue } from "jotai";

import { currentBlockAtom } from "@/store/jotai";

const Property = () => {
  const block = useAtomValue(currentBlockAtom);

  if (!block) return null;

  return (
    <div>
      <Title order={3}>選択中のブロック</Title>
      <List>
        <List.Item>ブロックID: {block.id}</List.Item>
        <List.Item>テキスト: {block.content}</List.Item>
        <List.Item>開始時間: {block.start}ms</List.Item>
        <List.Item>継続時間: {block.duration}ms</List.Item>
      </List>
    </div>
  );
};
export default Property;
