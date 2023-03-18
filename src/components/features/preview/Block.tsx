import { BlockDBProps } from "@/types/db";

type Props = {
  block: BlockDBProps;
};

const Block: React.FC<Props> = ({ block }) => {
  const initial_state = block.initial_state as React.CSSProperties;
  return (
    <div
      id={`object-${block.id}`}
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        ...initial_state,
      }}
    >
      {block.content}
    </div>
  );
};

export default Block;
