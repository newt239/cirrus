"use client";

import { useState } from "react";

import { useAtom } from "jotai";

import { Button, Input, List, Title } from "@/lib/mantine/core";
import { blocksAtom, currentBlockAtom } from "@/store/jotai";

const Property = () => {
  const blocks = useAtom(blocksAtom);
  const [block, setProperty] = useAtom(currentBlockAtom);
  const [newContent, setNewContent] = useState(
    block && block.content ? block.content : ""
  );

  const changeContent = () => {
    setProperty(["content", newContent]);
  };

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
      <Input
        value={newContent}
        onChange={(v) => setNewContent(v.target.value)}
      />
      <Button onClick={changeContent} disabled={block.content === newContent}>
        変更
      </Button>
    </div>
  );
};
export default Property;
