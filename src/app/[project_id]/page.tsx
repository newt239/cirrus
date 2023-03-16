import "server-only";

import StudioHeader from "@/components/features/header/StudioHeader";
import Control from "@/components/features/preview/Control";
import Preview from "@/components/features/preview/Preview";
import Property from "@/components/features/property";
import Timeline from "@/components/features/timeline";
import { getProjectInfo } from "@/utils/db";

type Props = {
  params: { project_id: string };
};

const Studio = async ({ params }: Props) => {
  const project = await getProjectInfo(params.project_id);

  return (
    <div>
      {project && (
        <>
          <StudioHeader name={project.name} />
          <div style={{ display: "flex" }}>
            <div>
              <Preview project_id={project.id} />
              <Control />
            </div>
            <Property />
          </div>
          <Timeline />
        </>
      )}
    </div>
  );
};

export default Studio;
