import { Box, FileInput, Modal } from "~/libs/mantine/core";

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
          <FileInput
            accept="image/*"
            label="ファイルを選択"
            onChange={onChange}
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default AddImageModal;
