"use client";

import { Title } from "@mantine/core";
type Props = {
  name: string;
};
const StudioHeader: React.FC<Props> = ({ name }) => {
  return (
    <header>
      <Title order={1}>{name}</Title>
    </header>
  );
};

export default StudioHeader;
