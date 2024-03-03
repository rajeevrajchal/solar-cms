import Modal from "@components/modal/modal";
import { Button, Checkbox, Flex, Stack, TextInput } from "@mantine/core";
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
      name: "",
      payment: "",
      full_payment: false,
    },
    onSubmit: (values) => {
      confirm({
        ...values,
        payment: +values.payment,
      });
    },
  });

  return (
    <Modal opened={opened} close={close} title={title}>
      <Stack>
        <TextInput
          label="Name for order"
          placeholder="Name of order"
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
        <TextInput
          label="Payment"
          placeholder="Payment Ratio"
          name="payment"
          type="number"
          min={0}
          max={100}
          onChange={quoteApproveForm.handleChange}
          value={quoteApproveForm.values.payment}
          withAsterisk
          error={
            quoteApproveForm.touched?.payment &&
            quoteApproveForm.errors?.payment &&
            quoteApproveForm.errors?.payment
          }
        />
        <Checkbox
          label="Full Payment Done"
          name="full_payment"
          checked={quoteApproveForm.values?.full_payment}
          onChange={quoteApproveForm.handleChange}
        />
        <Flex gap="md" justify="flex-end" align="center">
          <Button
            color="red"
            variant="light"
            onClick={close}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            variant="light"
            onClick={() => quoteApproveForm.handleSubmit()}
            loading={loading}
            disabled={loading}
          >
            Place Order
          </Button>
        </Flex>
      </Stack>
    </Modal>
  );
};

export default QuoteApprove;
