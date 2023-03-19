"use client";

import { useState } from "react";

import { IconEdit } from "@tabler/icons-react";
import { useAtom } from "jotai";

import { ActionIcon, Button, Input, Popover } from "@/lib/mantine/core";
import { currentBlockAtom } from "@/store/jotai";

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
          value={newContent}
          onChange={(v) => setNewContent(v.target.value)}
        />
        <Button onClick={changeContent} disabled={block.content === newContent}>
          変更
        </Button>
      </Popover.Dropdown>
    </Popover>
  );
};
export default EditContent;
