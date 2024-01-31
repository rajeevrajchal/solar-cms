import { Modal as MModal } from "@mantine/core";
import { ReactElement } from "react";

export interface ModalProps {
  opened: boolean;
  close: () => void;
  title?: ReactElement | string;
  children: ReactElement;
}

const Modal = (props: ModalProps) => {
  const { title, opened, close, children } = props;

  return (
    <MModal
      opened={opened}
      onClose={close}
      title={title}
      centered
      size="md"
      autoFocus={false}
      withCloseButton={false}
    >
      {children}
    </MModal>
  );
};

export default Modal;
