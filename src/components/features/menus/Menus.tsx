import { Accordion } from "~/lib/mantine/core";

const Menus: React.FC = () => {
  return (
    <Accordion defaultValue={["item-1", "item-2"]} multiple>
      <Accordion.Item value="item-1">
        <Accordion.Control>control-1</Accordion.Control>
        <Accordion.Panel>panel-1</Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item value="item-2">
        <Accordion.Control>control-2</Accordion.Control>
        <Accordion.Panel>panel-2</Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
};

export default Menus;
