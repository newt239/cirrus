import { Accordion } from "~/libs/mantine/core";

import AddBlock from "./AddBlock";

const SideBar: React.FC = () => {
  return (
    <Accordion
      defaultValue={["block"]}
      multiple
      styles={{ label: { padding: "0.5rem", paddingLeft: 0 } }}
    >
      <Accordion.Item value="block">
        <Accordion.Control>ブロック</Accordion.Control>
        <Accordion.Panel>
          <AddBlock />
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item value="asset">
        <Accordion.Control>アセット</Accordion.Control>
        <Accordion.Panel>アイテムがありません</Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item value="history">
        <Accordion.Control>履歴</Accordion.Control>
        <Accordion.Panel>history will be shown here</Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
};

export default SideBar;
