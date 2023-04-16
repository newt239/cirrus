"use client";

import { MantineProvider } from "@mantine/core";

type Props = { children: React.ReactNode };

const Provider: React.FC<Props> = ({ children }) => {
  return <MantineProvider>{children}</MantineProvider>;
};

export default Provider;
