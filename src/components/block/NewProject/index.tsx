"use client";

import { Button, Card } from "@mantine/core";
import { IconSquareRoundedPlus } from "@tabler/icons-react";

import useStyles from "./styles";

const NewProject: React.FC = () => {
  const { classes } = useStyles();
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      className={classes.card}
    >
      <Button
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
