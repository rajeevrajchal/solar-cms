import Modal from "@components/modal/modal";
import { Button, Flex, Stack, TextInput } from "@mantine/core";
import { useFormik } from "formik";
import { ReactElement } from "react";

interface QuoteApproveProps {
  opened: boolean;
  close: () => void;
  confirm: (payload: any) => void;
  loading?: boolean;
  title: ReactElement | string;
}

const QuoteApprove = (props: QuoteApproveProps) => {
  const { opened, close, title, loading, confirm } = props;

  const quoteApproveForm = useFormik({
    initialValues: {
      payment: "",
    },
    onSubmit: (values) => {
      console.log("the values", values);
      confirm(values.payment);
    },
  });

  return (
    <Modal opened={opened} close={close} title={title}>
      <Stack>
        <TextInput
          label="Payment"
          placeholder="Payment Ratio"
          name="payment"
          onChange={quoteApproveForm.handleChange}
          value={quoteApproveForm.values.payment}
          withAsterisk
          error={
            quoteApproveForm.touched?.payment &&
            quoteApproveForm.errors?.payment &&
            quoteApproveForm.errors?.payment
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
