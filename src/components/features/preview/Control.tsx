"use client";

import { useEffect, useState } from "react";

import { useInterval } from "@mantine/hooks";
import dayjs from "dayjs";
import { gsap } from "gsap";
import { useAtomValue } from "jotai";

import { Button, Flex, Progress } from "@/lib/mantine/core";
import { blocksAtom } from "@/store/jotai";

const Control: React.FC = () => {
  const blocks = useAtomValue(blocksAtom);
  const [tl, setTl] = useState(gsap.timeline());
  const [currentTime, setCurrentTime] = useState(0);

  const duration = tl.duration();

  const interval = useInterval(() => {
    if (duration === tl.time()) interval.toggle();
    setCurrentTime(tl.time());
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
    <Flex justify="space-between" align="center">
      <Button onClick={playAnime}>再生</Button>
      <Progress value={(currentTime / duration) * 100} w="70%" />
      <div>{dayjs(currentTime * 1000).format("mm:ss")}</div>
    </Flex>
  );
};
export default Control;
