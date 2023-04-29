"use client";

import { Accordion, Navbar } from "~/libs/mantine/core";

import AddBlock from "./AddBlock";

type Props = {
  project_id: string;
};

const SideBar: React.FC<Props> = ({ project_id }) => {
  return (
    <Navbar
      fixed={false}
      position={{ top: 0, left: 0 }}
      width={{ base: 300 }}
      zIndex={1}
    >
      <Navbar.Section grow>
        <Accordion
          defaultValue={["block"]}
          multiple
          styles={{ label: { padding: "0.5rem", paddingLeft: 0 } }}
        >
          <Accordion.Item value="block">
            <Accordion.Control>ブロック</Accordion.Control>
            <Accordion.Panel>
              <AddBlock project_id={project_id} />
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
      </Navbar.Section>
    </Navbar>
  );
};

export default SideBar;
