import Modal from "@components/modal/modal";
import { Button, Flex, Stack, TextInput } from "@mantine/core";
import { useFormik } from "formik";
import { ReactElement } from "react";

interface QuoteApproveProps {
  opened: boolean;
  close: () => void;
  confirm: () => void;
  loading?: boolean;
  title: ReactElement | string;
}

const QuoteApprove = (props: QuoteApproveProps) => {
  const { opened, close, title, loading, confirm } = props;

  const quoteApproveForm = useFormik({
    initialValues: {
      name: "",
      quote_id: "",
    },
    onSubmit: (values) => {
      console.log("the values", values);
      confirm();
    },
  });

  return (
    <Modal opened={opened} close={close} title={title}>
      <Stack>
        <TextInput
          label="Name"
          placeholder="Order Name"
          name="name"
          onChange={quoteApproveForm.handleChange}
          value={quoteApproveForm.values.name}
          withAsterisk
          error={
            quoteApproveForm.touched?.name &&
            quoteApproveForm.errors?.name &&
            quoteApproveForm.errors?.name
          }
        />
        <Flex gap="md" justify="flex-end" align="center">
          <Button variant="light" onClick={close} disabled={loading}>
            Cancel
          </Button>
          <Button
            color="red"
            variant="light"
            onClick={() => quoteApproveForm.handleSubmit()}
            loading={loading}
            disabled={loading}
          >
            Order
          </Button>
        </Flex>
      </Stack>
    </Modal>
  );
};

export default QuoteApprove;
