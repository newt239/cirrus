import StudioHeader from "@/components/features/header/StudioHeader";
import { getProjectInfo } from "@/utils/db";
import "server-only";

type Props = {
  params: { project_id: string };
};

const Studio = async ({ params }: Props) => {
  const project = await getProjectInfo(params.project_id);
  return <div>{project && <StudioHeader name={project.name} />}</div>;
};

export default Studio;
