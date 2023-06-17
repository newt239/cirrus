import { Box, FileInput, Modal, Text } from "~/libs/mantine/core";

type Props = {
  opened: boolean;
  onClose: () => void;
  onChange: (f: File) => void;
};

const AddImageModal: React.FC<Props> = ({ opened, onClose, onChange }) => {
  return (
    <Box>
      <Modal
        onClose={onClose}
        opened={opened}
        size="sm"
        title="画像を追加"
        withCloseButton
      >
        <Box>
          <Box>
            <Text>画像を選択してください</Text>
          </Box>
          <Box>
            <FileInput
              label="ファイルを選択"
              onChange={onChange}
              placeholder="https://example.com/image.png"
              withAsterisk
            />
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default AddImageModal;
