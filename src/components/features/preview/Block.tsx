import { clsx } from "@mantine/core";
import { useLiveQuery } from "dexie-react-hooks";

import { BlockDBProps } from "~/types/db";
import { db } from "~/utils/dexie";

type Props = {
  block: BlockDBProps;
};

const Block: React.FC<Props> = ({ block }) => {
  const image = useLiveQuery(() => db.images.get(block.id));

  if (block.type === "image" && !image) return null;

  return (
    <>
      {block.type === "image" && image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          alt={block.name!}
          className={clsx("absolute", "top-1/2", "left-1/2", "hidden")}
          decoding="async"
          id={`object-${block.id}`}
          src={image?.source!}
        />
      ) : (
        <div
          className={clsx("absolute", "top-1/2", "left-1/2", "hidden")}
          id={`object-${block.id}`}
        />
      )}
    </>
  );
};

export default Block;
