import "server-only";

import { Box, Flex } from "~/libs/mantine/core";

import Control from "~/components/features/preview/Control";
import Preview from "~/components/features/preview/Preview";
import { getProjectInfo } from "~/utils/db";

type Props = {
  params: { project_id: string };
};

const Theather = async ({ params }: Props) => {
  const project = await getProjectInfo(params.project_id);

  return (
    <>
      {project && (
        <Flex gap="sm" justify="center" p="sm">
          <Box>
            <Preview project_id={project.id} />
            <Control />
          </Box>
        </Flex>
      )}
    </>
  );
};

export default Theather;
