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
    <Card h="100%" padding="lg" radius="md" shadow="sm" withBorder>
      <Button
        fullWidth
        h="100%"
        leftIcon={<IconSquareRoundedPlus />}
        onClick={createNewProject}
        variant="white"
      >
        新規作成
      </Button>
    </Card>
  );
};

export default NewProject;
