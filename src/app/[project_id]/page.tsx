"use client";

import { Aside, Box, Flex, Navbar } from "~/libs/mantine/core";

import ASideBar from "~/components/features/aside/AsideBar";
import Control from "~/components/features/preview/Control";
import Preview from "~/components/features/preview/Preview";
import SideBar from "~/components/features/sidebar/SideBar";
import Timeline from "~/components/features/timeline/Timeline";
import { getProjectInfo } from "~/utils/db";

type Props = {
  params: { project_id: string };
};

const Theather = async ({ params }: Props) => {
  const project = await getProjectInfo(params.project_id);

  return (
    <Flex h="100%">
      <Navbar
        fixed={false}
        position={{ top: 0, left: 0 }}
        width={{ base: 300 }}
        zIndex={1}
      >
        <Navbar.Section grow>
          <SideBar />
        </Navbar.Section>
      </Navbar>
      <Box bg="gray.1" h="100%" w="100%">
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
      </Box>
      <Aside
        fixed={false}
        position={{ top: 0, right: 0 }}
        width={{ base: 500 }}
        zIndex={1}
      >
        <Aside.Section grow>
          <ASideBar />
        </Aside.Section>
      </Aside>
    </Flex>
  );
};

export default Theather;
