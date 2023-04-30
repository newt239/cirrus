"use client";

import { Box, Button } from "~/libs/mantine/core";

import { IconPlus } from "@tabler/icons-react";
import { useSetAtom } from "jotai";

import { setBlockAtom } from "~/store/jotai";
import { addBlock } from "~/utils/db";

type Props = {
  project_id: string;
};

const AddBlock: React.FC<Props> = ({ project_id }) => {
  const setNewBlock = useSetAtom(setBlockAtom);

  const addNewBlock = async () => {
    const newBlock = await addBlock(project_id);
    if (newBlock) {
      setNewBlock(["add", newBlock]);
      console.log(newBlock);
    } else {
      console.log("error");
    }
  };

  return (
    <Box>
      <Button
        fullWidth
        leftIcon={<IconPlus />}
        onClick={addNewBlock}
        variant="subtle"
      >
        ブロックを追加
      </Button>
    </Box>
  );
};

export default AddBlock;
