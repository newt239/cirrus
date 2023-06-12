"use client";

import { useEffect, useState } from "react";

import { NumberInput } from "~/libs/mantine/core";

import { BlockDBProps } from "~/types/db";
import { updateBlockConfig } from "~/utils/db";

type Props = {
  block: BlockDBProps;
};

const EditDuration: React.FC<Props> = ({ block }) => {
  const [duration, setDuration] = useState<number | "">(block.duration);

  useEffect(() => {
    setDuration(block.duration);
  }, [block.id]);

  useEffect(() => {
    if (duration !== "" && duration !== block.duration) {
      updateBlockConfig(block.id, "duration", duration);
    }
  }, [duration]);

  return (
    <NumberInput
      label="継続時間(ms)"
      min={0}
      onChange={(v) => setDuration(v)}
      value={duration}
    />
  );
};

export default EditDuration;
