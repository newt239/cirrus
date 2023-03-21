"use client";

import { useEffect, useRef, useState } from "react";

import { ActionIcon, Flex, Progress } from "@/lib/mantine/core";

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

import { blocksAtom } from "@/store/jotai";

const Control: React.FC = () => {
  const blocks = useAtomValue(blocksAtom);
  const { current: tl } = useRef(gsap.timeline({ paused: true }));
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const duration = blocks.reduce(
    (accumulator, block) => accumulator + block.duration / 1000,
    0
  );
  const isEnded = currentTime >= duration;

  const interval = useInterval(() => {
    setCurrentTime(tl.time());
    console.log([currentTime >= duration, currentTime, duration]);
    if (isEnded) {
      setIsPlaying(false);
      interval.stop();
    }
  }, 10);

  useEffect(() => {
    if (isPlaying) {
      interval.start();
    }
    return interval.stop;
  }, [isPlaying, currentTime]);

  useEffect(() => {
    for (const block of blocks) {
      const final_state = block.final_state as gsap.TweenVars;
      tl.to(`#object-${block.id}`, {
        duration: block.duration / 1000,
        ...final_state,
      });
    }
  }, [blocks]);

  const playAnime = () => {
    if (!isPlaying) {
      if (isEnded) {
        setCurrentTime(0);
        tl.restart();
      } else {
        tl.play();
      }
      setIsPlaying(true);
      interval.start();
    } else {
      tl.pause();
      interval.stop();
      setIsPlaying(false);
    }
  };

  const stopAnime = () => {
    setIsPlaying(false);
    tl.pause(0);
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
