import NextLink from "next/link";

import { ActionIcon, Flex, Title } from "~/lib/mantine/core";

import { IconHome } from "@tabler/icons-react";

import MenuBar from "../menubar/MenuBar";

const StudioHeader: React.FC = () => {
  return (
    <>
      <Flex align="center" gap="md">
        <NextLink href="/dashboard">
          <ActionIcon color="blue" size="lg">
            <IconHome />
          </ActionIcon>
        </NextLink>
        <Title order={1}>無題のプロジェクト</Title>
      </Flex>
      <MenuBar />
    </>
  );
};

export default StudioHeader;
