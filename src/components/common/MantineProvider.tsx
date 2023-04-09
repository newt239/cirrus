"use client";

import { MantineProvider } from "@mantine/core";

const Provider = ({ children }: { children: React.ReactNode }) => {
  return <MantineProvider>{children}</MantineProvider>;
};

export default Provider;
