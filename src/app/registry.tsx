"use client";

import { useServerInsertedHTML } from "next/navigation";
import React, { useState } from "react";

import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";

const EmotionRegistry = ({ children }: { children: React.ReactNode }) => {
  const [emotionCache] = useState(() => {
    const emotionCache = createCache({ key: "css", prepend: true });
    emotionCache.compat = true;
    return emotionCache;
  });

  useServerInsertedHTML(() => {
    return (
      <style
        dangerouslySetInnerHTML={{
          __html: Object.values(emotionCache.inserted).join(" "),
        }}
        data-emotion={`${emotionCache.key} ${Object.keys(
          emotionCache.inserted
        ).join(" ")}`}
      />
    );
  });
  if (typeof window !== "undefined") return <>{children}</>;

  return <CacheProvider value={emotionCache}>{children}</CacheProvider>;
};

export default EmotionRegistry;
