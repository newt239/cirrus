"use client";

import { useEffect, useState } from "react";

import { useInterval } from "@mantine/hooks";
import { gsap } from "gsap";
import { useAtomValue } from "jotai";

import { Button, Flex } from "@/lib/mantine/core";
import { blocksAtom } from "@/store/jotai";

const Control: React.FC = () => {
  const blocks = useAtomValue(blocksAtom);
  const [tl, setTl] = useState(gsap.timeline());
  const [currentMs, setCurrentMs] = useState(0);
  const interval = useInterval(() => {
    if (tl.totalTime() === tl.time()) interval.toggle();
    setCurrentMs(tl.time());
  }, 10);

  const playAnime = () => {
    for (const block of blocks) {
      const final_state = block.final_state as gsap.TweenVars;
      tl.to(`#object-${block.id}`, {
        duration: block.duration / 1000,
        ...final_state,
      });
    }
    tl.play();
  };

  useEffect(() => {
    interval.start();
    return interval.stop;
  }, []);

  return (
    <Flex justify="space-between">
      <Button onClick={playAnime}>再生</Button>
      <div>{currentMs}ms</div>
    </Flex>
  );
};
export default Control;
