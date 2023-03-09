"use client";

import { useRouter } from "next/navigation";

import { Button, Card } from "@mantine/core";
import { IconSquareRoundedPlus } from "@tabler/icons-react";
import { useAtomValue } from "jotai";
import { nanoid } from "nanoid";

import useStyles from "./styles";

import { sessionAtom } from "@/store/jotai";
import supabase from "@/utils/supabase";

const NewProject: React.FC = () => {
  const { classes } = useStyles();
  const router = useRouter();
  const session = useAtomValue(sessionAtom);

  const createNewProject = async () => {
    if (session) {
      const id = nanoid(6);
      await supabase
        .from("projects")
        .insert([{ id, creator: session.user.id }]);
      router.push(`/${id}/`);
    }
  };

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      className={classes.card}
    >
      <Button
        onClick={createNewProject}
        fullWidth
        variant="white"
        leftIcon={<IconSquareRoundedPlus />}
        className={classes.button}
      >
        新規作成
      </Button>
    </Card>
  );
};

export default NewProject;
