import "server-only";

import { Box, Flex } from "~/libs/mantine/core";

import Control from "~/components/features/preview/Control";
import Preview from "~/components/features/preview/Preview";
import UpdateData from "~/components/features/preview/UpdateData";
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
        <>
          <UpdateData
            blocks={source.blocks}
            images={source.images}
            styles={source.styles}
          />
          <Flex gap="sm" justify="center" p="sm">
            <Box>
              <Preview project_id={params.project_id} />
              <Control project_id={params.project_id} />
            </Box>
          </Flex>
        </>
      )}
    </>
  );
};

export default Theater;
