"use client";

import { useRouter } from "next/navigation";

import { Button, Card } from "@/lib/mantine/core";

import { IconSquareRoundedPlus } from "@tabler/icons-react";
import { useAtomValue } from "jotai";
import { nanoid } from "nanoid";

import { sessionAtom } from "@/store/jotai";
import supabase from "@/utils/supabase";

const NewProject: React.FC = () => {
  const router = useRouter();
  const session = useAtomValue(sessionAtom);

  const createNewProject = async () => {
    if (session) {
      const id = nanoid(6);
      await supabase
        .from("projects")
        .insert([{ id, name: "無題のプロジェクト", creator: session.user.id }]);
      router.push(`/${id}/`);
    }
  };

  return (
    <Card
      padding="lg"
      radius="md"
      shadow="sm"
      sx={{ height: "100%" }}
      withBorder
    >
      <Button
        fullWidth
        leftIcon={<IconSquareRoundedPlus />}
        onClick={createNewProject}
        sx={{ height: "100%" }}
        variant="white"
      >
        新規作成
      </Button>
    </Card>
  );
};

export default NewProject;
