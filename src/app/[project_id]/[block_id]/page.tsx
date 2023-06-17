import "server-only";
import ASideBar from "~/components/features/aside/AsideBar";
import { getBlock } from "~/utils/db";

type Props = {
  params: { block_id: string };
};

const Theather = async ({ params }: Props) => {
  const block = await getBlock(params.block_id);

  if (!block || !block.styles) return null;

  return <ASideBar block_id={params.block_id} />;
};

export default Theather;
