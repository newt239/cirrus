"use client";

import { useServerInsertedHTML } from "next/navigation";

import { CacheProvider } from "@emotion/react";
import { MantineProvider, useEmotionCache } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";

const RootStyleRegistry = ({ children }: { children: React.ReactNode }) => {
  const cache = useEmotionCache();
  cache.compat = true;

  useServerInsertedHTML(() => (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.values(cache.inserted).join(" "),
      }}
      data-emotion={`${cache.key} ${Object.keys(cache.inserted).join(" ")}`}
    />
  ));

  return (
    <CacheProvider value={cache}>
      <MantineProvider
        theme={{
          fontFamily:
            '"LINESeedJP", "Noto Sans JP", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
          components: {
            Button: {
              styles: {
                root: {
                  fontWeight: "inherit",
                },
              },
            },
          },
        }}
        withGlobalStyles
        withNormalizeCSS
      >
        <ModalsProvider>{children}</ModalsProvider>
      </MantineProvider>
    </CacheProvider>
  );
};

export default RootStyleRegistry;
