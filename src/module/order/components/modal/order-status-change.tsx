import Modal from "@components/modal/modal";
import { Button, Flex, Stack, Text, TextInput } from "@mantine/core";
import { useFormik } from "formik";
import { ReactElement } from "react";
import * as Yup from "yup";

interface OrderStatusChangeProps {
  opened: boolean;

  close: () => void;
  confirm: (payload: any) => void;
  loading?: boolean;
  title: ReactElement | string;
  description: ReactElement | string;
}

const OrderStatusChange = (props: OrderStatusChangeProps) => {
  const { opened, close, title, description, loading, confirm } = props;

  const orderStatusChangeForm = useFormik({
    initialValues: {
      reason: "",
    },
    validationSchema: Yup.object().shape({
      reason: Yup.string().required("Reason is required"),
    }),
    onSubmit: (values) => {
      confirm(values);
    },
  });

  return (
    <Modal opened={opened} close={close} title={title}>
      <Stack>
        {description ? description : <Text>{description} </Text>}
        <TextInput
          label="Reason"
          placeholder="Reason for status change"
          name="reason"
          onChange={orderStatusChangeForm.handleChange}
          value={orderStatusChangeForm.values.reason}
          withAsterisk
          error={
            orderStatusChangeForm.touched?.reason &&
            orderStatusChangeForm.errors?.reason &&
            orderStatusChangeForm.errors?.reason
          }
        />
        <Flex gap="md" justify="flex-end" align="center">
          <Button variant="light" onClick={close} disabled={loading}>
            Cancel
          </Button>
          <Button
            color="red"
            variant="light"
            onClick={() => orderStatusChangeForm.handleSubmit()}
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

export default OrderStatusChange;
