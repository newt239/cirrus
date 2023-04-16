"use client";

import { useEffect, useState } from "react";

import { Input } from "~/libs/mantine/core";

import { useAtom } from "jotai";

import { currentBlockAtom } from "~/store/jotai";

const EditText: React.FC = () => {
  const [block, setProperty] = useAtom(currentBlockAtom);
  const [text, setText] = useState(
    block && block.initial_style.textContent
      ? block.initial_style.textContent
      : ""
  );

  useEffect(() => {
    const updateText = () => {
      if (block && block.initial_style.textContent !== text) {
        setProperty(["initial_style", "textContent", text]);
      }
    };
    updateText();
  }, [text]);

  if (!block) return null;

  return (
    <Input.Wrapper label="テキスト">
      <Input onChange={(v) => setText(v.target.value)} value={text} />
    </Input.Wrapper>
  );
};

export default EditText;
