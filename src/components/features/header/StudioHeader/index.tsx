"use client";

import useStyles from "@/components/features/header/AppHeader/styles";
import { Title } from "@/lib/mantine/core";

type Props = {
  name: string;
};

const StudioHeader: React.FC<Props> = ({ name }) => {
  const { classes } = useStyles();

  return (
    <header className={classes.header}>
      <Title order={1}>{name}</Title>
    </header>
  );
};

export default StudioHeader;
