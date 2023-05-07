"use client";

import { useEffect, useState } from "react";

import { NumberInput } from "~/libs/mantine/core";

import { useSetAtom } from "jotai";

import { updateDurationAtom } from "~/store/jotai";
import { BlockDBProps } from "~/types/db";

type Props = {
  block: BlockDBProps;
};

const EditDuration: React.FC<Props> = ({ block }) => {
  const updateDuration = useSetAtom(updateDurationAtom);
  const [duration, setDuration] = useState<number | "">(block.duration);

  useEffect(() => {
    setDuration(block.duration);
  }, [block.id]);

  useEffect(() => {
    if (duration !== "" && duration !== block.duration) {
      updateDuration([block.id, duration]);
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
