import "server-only";

import { Box, Flex } from "~/libs/mantine/core";

import Control from "~/components/features/preview/Control";
import Preview from "~/components/features/preview/Preview";
import { getProjectInfo, getProjectSource } from "~/utils/db";

type Props = {
  params: { project_id: string };
};

const Theater = async ({ params }: Props) => {
  const project = await getProjectInfo(params.project_id);
  const source = await getProjectSource(params.project_id);

  if (!project || !source) return null;

  return (
    <>
      {project && (
        <Flex gap="sm" justify="center" p="sm">
          <Box>
            <Preview blocks={source.blocks} />
            <Control blocks={source.blocks} styles={source.styles} />
          </Box>
        </Flex>
      )}
    </>
  );
};

export default Theater;
