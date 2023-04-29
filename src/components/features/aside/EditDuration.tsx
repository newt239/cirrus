"use client";

import { useEffect, useState } from "react";

import { NumberInput } from "~/libs/mantine/core";

import { useSetAtom } from "jotai";

import { setPropertyAtom } from "~/store/jotai";
import { BlockProps } from "~/types/db";

type Props = {
  block: BlockProps;
};

const EditDuration: React.FC<Props> = ({ block }) => {
  const setProperty = useSetAtom(setPropertyAtom);
  const [duration, setDuration] = useState<number | "">(block.duration);

  useEffect(() => {
    if (duration !== "") {
      setProperty(["duration", duration]);
    }
  }, [duration]);

  return (
    <NumberInput
      label="継続時間(ms)"
      onChange={(v) => setDuration(v)}
      value={duration}
    />
  );
};

export default EditDuration;
