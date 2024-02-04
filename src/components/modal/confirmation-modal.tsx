import { Button, Flex, Modal, Stack, Text } from "@mantine/core";
import { ReactElement } from "react";

interface ModalProps {
  opened: boolean;
  close: () => void;
  confirm: () => void;
  loading?: boolean;
  title: ReactElement | string;
  description: ReactElement | string;
}

const ConfirmationModal = (props: ModalProps) => {
  const { title, opened, loading, description, close, confirm } = props;

  return (
    <Modal
      opened={opened}
      onClose={close}
      title={title}
      centered
      size="sm"
      autoFocus={false}
      withCloseButton={false}
    >
      <Stack>
        {description ? (
          description
        ) : (
          <Text> Are you sure you want to delete this ?</Text>
        )}
        <Flex gap="md" justify="flex-end" align="center">
          <Button variant="light" onClick={close} disabled={loading}>
            No
          </Button>
          <Button
            color="red"
            variant="light"
            onClick={confirm}
            loading={loading}
            disabled={loading}
          >
            Yes
          </Button>
        </Flex>
      </Stack>
    </Modal>
  );
};

export default ConfirmationModal;
