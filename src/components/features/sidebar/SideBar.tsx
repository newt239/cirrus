import { Accordion } from "~/libs/mantine/core";

const SideBar: React.FC = () => {
  return (
    <Accordion
      defaultValue={["asset", "history"]}
      multiple
      styles={{ label: { padding: "0.5rem", paddingLeft: 0 } }}
    >
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
