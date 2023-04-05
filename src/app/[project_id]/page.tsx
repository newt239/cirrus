import "server-only";

import { Flex } from "~/lib/mantine/core";

import StudioHeader from "~/components/features/header/StudioHeader";
import Control from "~/components/features/preview/Control";
import Preview from "~/components/features/preview/Preview";
import Property from "~/components/features/property/Property";
import Timeline from "~/components/features/timeline/Timeline";
import { getProjectInfo } from "~/utils/db";

type Props = {
  params: { project_id: string };
};

const Studio = async ({ params }: Props) => {
  const project = await getProjectInfo(params.project_id);

  return (
    <>
      {project && (
        <>
          <Flex gap="sm" p="sm">
            <div>
              <Preview project_id={project.id} />
              <Control />
            </div>
            <Property />
          </Flex>
          <Timeline />
        </>
      )}
    </>
  );
};

export default Studio;
