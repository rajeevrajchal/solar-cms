import Dropzone from "@components/dropzone";
import { Button, Group, Stack } from "@mantine/core";

interface UploadDesignModalProps {
  form: any;
  closeModal: () => void;
  handleContinue: () => void;
}

const UploadDesignModal = (props: UploadDesignModalProps) => {
  const { closeModal, form, handleContinue } = props;

  return (
    <Stack>
      <Dropzone
        showPreview
        maxFiles={4}
        accept={{
          "image/*": [".jpg", ".jpeg", ".png"],
          "application/pdf": [],
        }}
        files={form.values.design_file}
        setFiles={(files) => form.setFieldValue("design_file", files)}
      />
      <Group justify="flex-end">
        <Button variant="subtle" color="red" onClick={() => closeModal()}>
          Cancel
        </Button>
        <Button variant="light" onClick={() => handleContinue()}>
          Continue
        </Button>
      </Group>
    </Stack>
  );
};

export default UploadDesignModal;
