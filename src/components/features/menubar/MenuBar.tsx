"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { Box, Flex, Menu, Text } from "~/libs/mantine/core";

import { modals } from "@mantine/modals";
import {
  IconArrowBack,
  IconArrowBackUp,
  IconInfoCircle,
  IconSettings,
  IconShare,
  IconTrash,
} from "@tabler/icons-react";

import MenuBarButton from "~/components/blocks/MenuBarButton";
import { deleteProject } from "~/utils/db";

type Props = {
  project_id: string;
};

const MenuBar: React.FC<Props> = ({ project_id }) => {
  const router = useRouter();

  const fileDetail = () =>
    modals.openConfirmModal({
      title: "ファイル情報",
      children: <Text size="sm">〇〇</Text>,
      labels: { confirm: "閉じる", cancel: "閉じる" },
      onConfirm: async () => {
        await deleteProject(project_id);
        router.push("/dashboard");
      },
    });

  const deleteFile = () =>
    modals.openConfirmModal({
      title: "ファイルを削除します",
      children: <Text size="sm">ファイルを削除します。</Text>,
      labels: { confirm: "削除する", cancel: "やめる" },
      confirmProps: { color: "red" },
      onConfirm: async () => {
        await deleteProject(project_id);
        router.push("/dashboard");
      },
    });

  return (
    <Flex>
      <Menu offset={0} position="bottom-start" shadow="md" width={200}>
        <Menu.Target>
          <Box>
            <MenuBarButton>ファイル</MenuBarButton>
          </Box>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item icon={<IconSettings size={14} />} onClick={fileDetail}>
            設定
          </Menu.Item>
          <Menu.Item disabled icon={<IconInfoCircle size={14} />}>
            詳細
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
          <Menu.Item disabled icon={<IconArrowBackUp size={14} />}>
            元に戻す
          </Menu.Item>
          <Menu.Item disabled icon={<IconArrowBack size={14} />}>
            やり直す
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
          <Link href={`/${project_id}/theater`} target="_blank">
            <Menu.Item icon={<IconShare size={14} />}>シェア画面</Menu.Item>
          </Link>
        </Menu.Dropdown>
      </Menu>
    </Flex>
  );
};

export default MenuBar;
