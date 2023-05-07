"use client";

import { useEffect, useState } from "react";

import { NumberInput } from "~/libs/mantine/core";

import { useSetAtom } from "jotai";

import { updateDurationAtom } from "~/store/jotai";
import { BlockDBProps } from "~/types/db";

type Props = {
  block: BlockDBProps;
};

const EditLayer: React.FC<Props> = ({ block }) => {
  const updateLayer = useSetAtom(updateDurationAtom);
  const [layer, setLayer] = useState<number | "">(block.layer);

  useEffect(() => {
    setLayer(block.layer);
  }, [block.id]);

  useEffect(() => {
    if (layer !== "" && layer !== block.layer) {
      updateLayer([block.id, layer]);
    }
  }, [layer]);

  return (
    <NumberInput
      label="レイヤー"
      max={10}
      min={0}
      onChange={(v) => setLayer(v)}
      value={layer}
    />
  );
};

export default EditLayer;
