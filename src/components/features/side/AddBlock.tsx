"use client";

import { useRouter } from "next/navigation";

import { Box, Button } from "~/libs/mantine/core";

import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";

import AddImageModal from "~/components/features/side/AddImageModal";
import { addImage, addText } from "~/utils/db";

type Props = {
  project_id: string;
};

const AddBlock: React.FC<Props> = ({ project_id }) => {
  const router = useRouter();
  const [opened, { open, close }] = useDisclosure(false);
  const addNewText = async () => {
    const text = await addText(project_id);
    if (text) router.push(`/${project_id}/${text.id}`);
  };

  const onChange = async (f: File) => {
    const image = await addImage(project_id, f);
    if (image) router.push(`/${project_id}/${image.id}`);
    close();
  };

  return (
    <Box>
      <Button
        fullWidth
        leftIcon={<IconPlus />}
        onClick={addNewText}
        variant="subtle"
      >
        テキストを追加
      </Button>
      <Button fullWidth leftIcon={<IconPlus />} onClick={open} variant="subtle">
        画像を追加
      </Button>
      <AddImageModal
        onChange={(f) => onChange(f)}
        onClose={close}
        opened={opened}
      />
    </Box>
  );
};

export default AddBlock;
