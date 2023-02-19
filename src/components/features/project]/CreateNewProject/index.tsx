import { Button, Group, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";

const CreateNewProject = () => {
  const form = useForm<{ project_name: string }>({
    initialValues: {
      project_name: "",
    },
    validateInputOnChange: true,
  });

  return (
    <div>
      <Title order={2}>プロジェクトの作成</Title>
      <TextInput
        label="プロジェクト名"
        placeholder="テスト"
        {...form.getInputProps("project_name")}
      />
      <Group position="right" mt="md">
        <Button>新規作成</Button>
      </Group>
    </div>
  );
};

export default CreateNewProject;
