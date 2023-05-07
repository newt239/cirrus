"use client";

import { useEffect, useState } from "react";

import { NumberInput } from "~/libs/mantine/core";

import { useSetAtom } from "jotai";

import { updateStartTimeAtom } from "~/store/jotai";
import { BlockDBProps } from "~/types/db";

type Props = {
  block: BlockDBProps;
};

const EditStartTime: React.FC<Props> = ({ block }) => {
  const updateStartTime = useSetAtom(updateStartTimeAtom);
  const [startTime, setStartTime] = useState<number | "">(block.start);

  useEffect(() => {
    setStartTime(block.start);
  }, [block.id]);

  useEffect(() => {
    if (startTime !== "" && startTime !== block.start) {
      updateStartTime([block.id, startTime]);
    }
  }, [startTime]);

  return (
    <NumberInput
      label="開始時間(ms)"
      min={0}
      onChange={(v) => setStartTime(v)}
      value={startTime}
    />
  );
};

export default EditStartTime;
