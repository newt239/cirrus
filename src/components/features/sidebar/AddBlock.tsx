import { Box, Button } from "~/libs/mantine/core";

import { IconPlus } from "@tabler/icons-react";

const AddBlock: React.FC = () => {
  return (
    <Box>
      <Button fullWidth leftIcon={<IconPlus />} variant="subtle">
        ブロックを追加
      </Button>
    </Box>
  );
};

export default AddBlock;
