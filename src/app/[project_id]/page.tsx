import "server-only";

import { usePathname } from "next/navigation";

import { Aside, Box, Flex, Navbar, ScrollArea } from "~/libs/mantine/core";

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
  const pathname = usePathname();
  const project = await getProjectInfo(params.project_id);

  return (
    <>
      <Navbar
        fixed={false}
        position={{ top: 0, left: 0 }}
        width={{ base: 300 }}
        zIndex={1}
      >
        <Navbar.Section component={ScrollArea} grow>
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
        <Aside.Section component={ScrollArea} grow>
          <ASideBar />
        </Aside.Section>
      </Aside>
    </>
  );
};

export default Theather;
