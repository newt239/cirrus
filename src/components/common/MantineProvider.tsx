"use client";

import { createEmotionCache, MantineProvider } from "@mantine/core";

const myCache = createEmotionCache({ key: "mantine" });

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <MantineProvider emotionCache={myCache} withGlobalStyles>
      {children}
    </MantineProvider>
  );
}
