"use client";

import { useState } from "react";

import { ActionIcon, Button, Input, Popover } from "~/lib/mantine/core";

import { IconEdit } from "@tabler/icons-react";
import { useAtom } from "jotai";

import { currentBlockAtom } from "~/store/jotai";

const EditContent: React.FC = () => {
  const [block, setProperty] = useAtom(currentBlockAtom);
  const [newContent, setNewContent] = useState(
    block && block.content ? block.content : ""
  );

  const changeContent = () => {
    setProperty(["content", newContent]);
  };

  if (!block) return null;

  return (
    <Popover>
      <Popover.Target>
        <ActionIcon>
          <IconEdit />
        </ActionIcon>
      </Popover.Target>
      <Popover.Dropdown>
        <Input
          onChange={(v) => setNewContent(v.target.value)}
          value={newContent}
        />
        <Button disabled={block.content === newContent} onClick={changeContent}>
          変更
        </Button>
      </Popover.Dropdown>
    </Popover>
  );
};
export default EditContent;
