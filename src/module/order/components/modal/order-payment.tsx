import Modal from "@components/modal/modal";
import { Button, Checkbox, Flex, Stack, TextInput } from "@mantine/core";
import { useFormik } from "formik";
import { ReactElement } from "react";

interface OrderPaymentProps {
  opened: boolean;
  close: () => void;
  confirm: (payload: any) => void;
  loading?: boolean;
  title: ReactElement | string;
}

const OrderPayment = (props: OrderPaymentProps) => {
  const { opened, close, title, loading, confirm } = props;

  const orderPaymentForm = useFormik({
    initialValues: {
      payment: "",
      full_payment: false,
    },
    onSubmit: (values) => {
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
          onChange={orderPaymentForm.handleChange}
          value={orderPaymentForm.values.payment}
          withAsterisk
          error={
            orderPaymentForm.touched?.payment &&
            orderPaymentForm.errors?.payment &&
            orderPaymentForm.errors?.payment
          }
        />
        <Checkbox
          label="Full Payment Done"
          name="full_payment"
          checked={orderPaymentForm.values?.full_payment}
          onChange={orderPaymentForm.handleChange}
        />
        <Flex gap="md" justify="flex-end" align="center">
          <Button variant="light" onClick={close} disabled={loading}>
            Cancel
          </Button>
          <Button
            color="red"
            variant="light"
            onClick={() => orderPaymentForm.handleSubmit()}
            loading={loading}
            disabled={loading}
          >
            Update
          </Button>
        </Flex>
      </Stack>
    </Modal>
  );
};

export default OrderPayment;
