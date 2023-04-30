"use client";

import { useEffect, useRef, useState } from "react";

import { ActionIcon, Flex, Progress } from "~/libs/mantine/core";

import { useInterval } from "@mantine/hooks";
import {
  IconPlayerPauseFilled,
  IconPlayerPlayFilled,
  IconPlayerStopFilled,
  IconRotate,
} from "@tabler/icons-react";
import dayjs from "dayjs";
import { gsap } from "gsap";
import { useAtomValue } from "jotai";

import { blocksAtom, stylesAtom } from "~/store/jotai";

const Control: React.FC = () => {
  const blocks = useAtomValue(blocksAtom);
  const styles = useAtomValue(stylesAtom);
  const { current: tl } = useRef(gsap.timeline({ paused: true }));
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const isEnded = currentTime >= duration && currentTime !== 0;

  const interval = useInterval(() => {
    setCurrentTime(tl.time());
    if (isEnded) {
      setIsPlaying(false);
      interval.stop();
    }
  }, 100);

  useEffect(() => {
    if (isPlaying) {
      interval.start();
    }
    return interval.stop;
  }, [isPlaying, currentTime]);

  const updateTimeline = () => {
    tl.progress(0);
    tl.kill();
    tl.clear();
    tl.call(() => interval.start(), [], 0);
    blocks.map((block) => {
      const blockStyles = styles.filter((style) => style.block_id === block.id);
      const initial_state = {} as gsap.TweenVars;
      const final_state = {} as gsap.TweenVars;
      blockStyles.map((style) => {
        initial_state[style.key] = style.initial_style;
        if (style.key !== "textContent") {
          final_state[style.key] = style.final_style;
        }
      });
      tl.set(
        `#object-${block.id}`,
        { ...initial_state, display: "block" },
        block.start / 1000
      );
      tl.to(
        `#object-${block.id}`,
        {
          duration: block.duration / 1000,
          ...final_state,
        },
        block.start / 1000
      );
      tl.set(
        `#object-${block.id}`,
        { display: "none" },
        (block.start + block.duration) / 1000
      );
    });
    tl.pause();
    const newDuration = blocks.reduce(
      (accumulator, block) =>
        Math.max(accumulator, (block.start + block.duration) / 1000),
      0
    );
    setDuration(newDuration);
  };

  const playAnime = () => {
    if (!isPlaying) {
      if (isEnded || currentTime === 0) {
        updateTimeline();
        setCurrentTime(0);
      }
      tl.play();
      setIsPlaying(true);
    } else {
      tl.pause();
      interval.stop();
      setIsPlaying(false);
    }
  };

  const stopAnime = () => {
    setIsPlaying(false);
    updateTimeline();
    interval.stop();
    setCurrentTime(0);
  };

  return (
    <Flex align="center" justify="space-between">
      <Flex>
        <ActionIcon color="blue" onClick={playAnime}>
          {!isPlaying ? (
            isEnded ? (
              <IconRotate />
            ) : (
              <IconPlayerPlayFilled />
            )
          ) : (
            <IconPlayerPauseFilled />
          )}
        </ActionIcon>
        <ActionIcon color="blue" onClick={stopAnime}>
          <IconPlayerStopFilled />
        </ActionIcon>
      </Flex>
      <Progress value={(currentTime / duration) * 100} w="70%" />
      <div>{dayjs(currentTime * 1000).format("mm:ss")}</div>
    </Flex>
  );
};
export default Control;
