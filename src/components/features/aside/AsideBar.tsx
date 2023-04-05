import { Accordion, Group, List } from "~/lib/mantine/core";

import { useAtomValue } from "jotai";

import EditContent from "./EditContent";

import { currentBlockAtom } from "~/store/jotai";

const ASideBar: React.FC = () => {
  const block = useAtomValue(currentBlockAtom);

  if (!block) return null;

  return (
    <Accordion
      defaultValue={["asset", "history"]}
      multiple
      styles={{ label: { padding: "0.5rem", paddingLeft: 0 } }}
    >
      <Accordion.Item value="asset">
        <Accordion.Control>ブロック情報</Accordion.Control>
        <Accordion.Panel>
          <List>
            <List.Item>ブロックID: {block.id}</List.Item>
            <List.Item>
              <Group>
                <span>テキスト: {block.content}</span>
                <EditContent />
              </Group>
            </List.Item>
            <List.Item>開始時間: {block.start}ms</List.Item>
            <List.Item>継続時間: {block.duration}ms</List.Item>
          </List>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
};

export default ASideBar;
