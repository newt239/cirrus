"use client";

import { Button } from "@mantine/core";
import { gsap } from "gsap";
import { useAtomValue } from "jotai";

import { blocksAtom } from "@/store/jotai";

const Control: React.FC = () => {
  const blocks = useAtomValue(blocksAtom);

  const tl = gsap.timeline();
  const playAnime = () => {
    for (const block of blocks) {
      const final_state = block.initial_state as gsap.TweenVars;
      tl.to(`#object-${block.id}`, {
        duration: block.duration,
        ...final_state,
      });
    }
    tl.play();
  };
  return <Button onClick={playAnime}>再生</Button>;
};
export default Control;
