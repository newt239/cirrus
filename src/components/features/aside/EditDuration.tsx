"use client";

import { useEffect, useState } from "react";

import { NumberInput } from "~/lib/mantine/core";

import { useAtom } from "jotai";

import { currentBlockAtom } from "~/store/jotai";

const EditDuration: React.FC = () => {
  const [block, setProperty] = useAtom(currentBlockAtom);
  const [duration, setDuration] = useState<number | "">(
    block && block.content ? block.duration : 0
  );

  useEffect(() => {
    if (duration !== "") {
      setProperty(["duration", duration]);
    }
  }, [duration]);

  if (!block) return null;

  return (
    <NumberInput
      label="継続時間(ms)"
      onChange={(v) => setDuration(v)}
      value={duration}
    />
  );
};

export default EditDuration;
