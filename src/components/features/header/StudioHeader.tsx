"use client";

import { Box, Title } from "~/lib/mantine/core";

type Props = {
  name: string;
};

const StudioHeader: React.FC<Props> = ({ name }) => {
  return (
    <Box
      component="header"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 2rem",
        position: "sticky",
        top: 0,
        zIndex: 1100,
        backdropFilter: "blur(8px)",
        boxShadow: "inset 0px -1px 1px #e7ebf0",
        backgroundColor: "rgba(255,255,255,0.8)",
      }}
    >
      <Title order={1}>{name}</Title>
    </Box>
  );
};

export default StudioHeader;
