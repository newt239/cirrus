"use client";

import { useEffect, useState } from "react";

import { NumberInput } from "~/lib/mantine/core";

import { useAtom } from "jotai";

import { currentBlockAtom } from "~/store/jotai";

const EditStartTime: React.FC = () => {
  const [block, setProperty] = useAtom(currentBlockAtom);
  const [startTime, setStartTime] = useState<number | "">(
    block && block.content ? block.start : 0
  );

  useEffect(() => {
    if (startTime !== "") {
      setProperty(["start", startTime]);
    }
  }, [startTime]);

  if (!block) return null;

  return (
    <NumberInput
      label="開始時間(ms)"
      onChange={(v) => setStartTime(v)}
      value={startTime}
    />
  );
};

export default EditStartTime;
