"use client";

import { Box, Flex, Menu } from "~/lib/mantine/core";

import { IconFile, IconSettings, IconTrash } from "@tabler/icons-react";

import MenuBarButton from "~/components/blocks/MenuBarButton";

const MenuBar: React.FC = () => {
  return (
    <Flex mx="xs">
      <Menu offset={0} position="bottom-start" shadow="md" width={200}>
        <Menu.Target>
          <Box>
            <MenuBarButton leftIcon={<IconFile />}>ファイル</MenuBarButton>
          </Box>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item icon={<IconSettings size={14} />}>Settings</Menu.Item>
          <Menu.Item color="red" icon={<IconTrash size={14} />}>
            ファイルを削除する
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Flex>
  );
};

export default MenuBar;
