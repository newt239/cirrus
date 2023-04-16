import { clsx } from "@mantine/core";

import { BlockDBProps } from "~/types/db";

type Props = {
  block: BlockDBProps;
};

const Block: React.FC<Props> = ({ block }) => {
  return (
    <div
      className={clsx("absolute", "top-1/2", "left-1/2")}
      id={`object-${block.id}`}
    />
  );
};

export default Block;
