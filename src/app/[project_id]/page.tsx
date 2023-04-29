import { Box, Flex } from "~/libs/mantine/core";

import ASideBar from "~/components/features/aside/AsideBar";
import MenuBar from "~/components/features/menubar/MenuBar";
import Control from "~/components/features/preview/Control";
import Preview from "~/components/features/preview/Preview";
import SideBar from "~/components/features/side/SideBar";
import Timeline from "~/components/features/timeline/Timeline";
import { getProjectInfo } from "~/utils/db";

type Props = {
  params: { project_id: string };
};

const Theather = async ({ params }: Props) => {
  const project = await getProjectInfo(params.project_id);

  if (!project) return null;

  return (
    <Flex direction="column">
      <MenuBar project_id={project?.id} />
      <Flex h="100%">
        <SideBar project_id={project.id} />
        <Box bg="gray.1" h="100%" w="100%">
          <Flex gap="sm" justify="center" p="sm">
            <Box>
              <Preview project_id={project.id} />
              <Control />
            </Box>
          </Flex>
          <Timeline />
        </Box>
        <ASideBar />
      </Flex>
    </Flex>
  );
};

export default Theather;
