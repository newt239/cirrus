import { Box, Button, Flex, Menu } from "~/lib/mantine/core";

import {
  IconArrowsLeftRight,
  IconFile,
  IconMessageCircle,
  IconPhoto,
  IconSearch,
  IconSettings,
  IconTrash,
} from "@tabler/icons-react";

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
          <Menu.Label>Application</Menu.Label>
          <Menu.Item icon={<IconSettings size={14} />}>Settings</Menu.Item>
          <Menu.Item icon={<IconMessageCircle size={14} />}>Messages</Menu.Item>
          <Menu.Item icon={<IconPhoto size={14} />}>Gallery</Menu.Item>
          <Menu.Item icon={<IconSearch size={14} />}>Search</Menu.Item>

          <Menu.Divider />

          <Menu.Label>Danger zone</Menu.Label>
          <Menu.Item icon={<IconArrowsLeftRight size={14} />}>
            Transfer my data
          </Menu.Item>
          <Menu.Item color="red" icon={<IconTrash size={14} />}>
            Delete my account
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Flex>
  );
};

export default MenuBar;
