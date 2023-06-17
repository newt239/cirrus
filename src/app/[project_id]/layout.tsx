import "server-only";

import { Flex } from "~/libs/mantine/core";

import MenuBar from "~/components/features/menubar/MenuBar";
import Control from "~/components/features/preview/Control";
import Preview from "~/components/features/preview/Preview";
import UpdateData from "~/components/features/preview/UpdateData";
import SideBar from "~/components/features/side/SideBar";
import Timeline from "~/components/features/timeline/Timeline";
import { getProjectInfo, getProjectSource } from "~/utils/db";

type Props = {
  params: { project_id: string };
  children: React.ReactNode;
};

const StudioLayout = async ({ params, children }: Props) => {
  const project = await getProjectInfo(params.project_id);
  const source = await getProjectSource(params.project_id);

  if (!project || !source) return null;

  return (
    <Flex className="grow" direction="column">
      <UpdateData
        blocks={source.blocks}
        images={source.images}
        styles={source.styles}
      />
      <MenuBar project_id={project?.id} />
      <Flex h="100%">
        <SideBar project_id={project.id} />
        <Flex bg="gray.1" direction="column" h="100%" w="100%">
          <Flex gap="sm" justify="center">
            <Flex direction="column">
              <Preview project_id={params.project_id} />
              <Control project_id={params.project_id} />
            </Flex>
          </Flex>
          <Timeline blocks={source.blocks} project_id={params.project_id} />
        </Flex>
        {children}
      </Flex>
    </Flex>
  );
};

export default StudioLayout;
