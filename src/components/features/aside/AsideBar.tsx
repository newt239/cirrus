"use client";

import { useEffect, useState } from "react";

import { Accordion, Input, List } from "~/lib/mantine/core";

import { useAtom } from "jotai";

import { currentBlockAtom } from "~/store/jotai";

const ASideBar: React.FC = () => {
  const [block, setProperty] = useAtom(currentBlockAtom);
  const [text, setText] = useState(block && block.content ? block.content : "");

  useEffect(() => {
    setProperty(["content", text]);
  }, [text]);

  if (!block) return null;

  return (
    <Accordion
      defaultValue={["asset", "history"]}
      multiple
      styles={{ label: { padding: "0.5rem", paddingLeft: 0 } }}
    >
      <Accordion.Item value="asset">
        <Accordion.Control>ブロック情報</Accordion.Control>
        <Accordion.Panel>
          <Input.Wrapper label="テキスト">
            <Input onChange={(v) => setText(v.target.value)} value={text} />
          </Input.Wrapper>
          <List>
            <List.Item>開始時間: {block.start}ms</List.Item>
            <List.Item>継続時間: {block.duration}ms</List.Item>
          </List>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
};

export default ASideBar;
