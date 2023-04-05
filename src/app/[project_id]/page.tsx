import "server-only";

import { Box, Flex } from "~/lib/mantine/core";

import Control from "~/components/features/preview/Control";
import Preview from "~/components/features/preview/Preview";
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
          <Flex gap="sm" justify="center" p="sm">
            <Box>
              <Preview project_id={project.id} />
              <Control />
            </Box>
          </Flex>
          <Timeline />
        </>
      )}
    </>
  );
};

export default Studio;
