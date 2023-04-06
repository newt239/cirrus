import { Accordion, Flex, Stack } from "~/lib/mantine/core";

import { useAtomValue } from "jotai";

import EditDuration from "./EditDuration";
import EditStartTime from "./EditStartTime";
import EditText from "./EditText";

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
        <Accordion.Control>選択中のブロック</Accordion.Control>
        <Accordion.Panel>
          <Stack spacing="xs">
            <EditText />
            <Flex gap="xs">
              <EditStartTime />
              <EditDuration />
            </Flex>
          </Stack>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
};

export default ASideBar;
