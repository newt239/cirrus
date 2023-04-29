"use client";

import { useEffect, useState } from "react";

import { NumberInput } from "~/libs/mantine/core";

import { useSetAtom } from "jotai";

import { setPropertyAtom } from "~/store/jotai";
import { BlockProps } from "~/types/db";

type Props = {
  block: BlockProps;
};

const EditStartTime: React.FC<Props> = ({ block }) => {
  const setProperty = useSetAtom(setPropertyAtom);
  const [startTime, setStartTime] = useState<number | "">(block.start);

  useEffect(() => {
    if (startTime !== "") {
      setProperty(["start", startTime]);
    }
  }, [startTime]);

  return (
    <NumberInput
      label="開始時間(ms)"
      onChange={(v) => setStartTime(v)}
      value={startTime}
    />
  );
};

export default EditStartTime;
