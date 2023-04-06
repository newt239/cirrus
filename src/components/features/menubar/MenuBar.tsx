"use client";

import { useRouter, usePathname } from "next/navigation";

import { Box, Flex, Menu, Text } from "~/lib/mantine/core";

import { modals } from "@mantine/modals";
import { IconSettings, IconTrash } from "@tabler/icons-react";

import MenuBarButton from "~/components/blocks/MenuBarButton";
import { deleteProject } from "~/utils/db";

const MenuBar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const deleteFile = () =>
    modals.openConfirmModal({
      title: "ファイルを削除します",
      children: <Text size="sm">ファイルを削除します。</Text>,
      labels: { confirm: "削除する", cancel: "やめる" },
      confirmProps: { color: "red" },
      onConfirm: async () => {
        await deleteProject(pathname.split("/")[1]);
        router.push("/dashboard");
      },
    });

  return (
    <Flex mx="xs">
      <Menu offset={0} position="bottom-start" shadow="md" width={200}>
        <Menu.Target>
          <Box>
            <MenuBarButton>ファイル</MenuBarButton>
          </Box>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item disabled icon={<IconSettings size={14} />}>
            設定
          </Menu.Item>
          <Menu.Item
            color="red"
            icon={<IconTrash size={14} />}
            onClick={deleteFile}
          >
            ファイルを削除
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
      <Menu offset={0} position="bottom-start" shadow="md" width={200}>
        <Menu.Target>
          <Box>
            <MenuBarButton>編集</MenuBarButton>
          </Box>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item disabled icon={<IconSettings size={14} />}>
            ああ
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
      <Menu offset={0} position="bottom-start" shadow="md" width={200}>
        <Menu.Target>
          <Box>
            <MenuBarButton>共有</MenuBarButton>
          </Box>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item disabled icon={<IconSettings size={14} />}>
            ああ
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Flex>
  );
};

export default MenuBar;
