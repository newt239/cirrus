"use client";

import { useEffect, useState } from "react";

import { Input } from "~/lib/mantine/core";

import { useAtom } from "jotai";

import { currentBlockAtom } from "~/store/jotai";

const EditText: React.FC = () => {
  const [block, setProperty] = useAtom(currentBlockAtom);
  const [text, setText] = useState(block && block.content ? block.content : "");

  useEffect(() => {
    setProperty(["content", text]);
  }, [text]);

  if (!block) return null;

  return (
    <Input.Wrapper label="テキスト">
      <Input onChange={(v) => setText(v.target.value)} value={text} />
    </Input.Wrapper>
  );
};

export default EditText;
