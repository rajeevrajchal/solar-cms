import useVendorMutate from "@hook/data/vendor/use-vendor-mutate";
import { Button, Fieldset, Flex, Stack, TextInput, Text } from "@mantine/core";
import { VENDOR } from "@model/vendor";
import { useFormik } from "formik";
import { isEmpty } from "lodash";
import * as Yup from "yup";

interface VendorFormProps {
  data?: VENDOR;
  onClose: () => void;
}

const VendorForm = (props: VendorFormProps) => {
  const { onClose, data } = props;
  const { create, update } = useVendorMutate();
  const vendorForm: any = useFormik({
    initialValues: {
      name: data?.name || "",
      code: data?.code || "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Name is required"),
      code: Yup.string().required("Code is required"),
    }),
    onSubmit: (values: any) => {
      if (isEmpty(data)) {
        create.mutate(values);
      } else {
        update.mutate({
          payload: values,
          vendor_id: data?.id,
        });
      }
    },
  });

  return (
    <Stack>
      <Fieldset
        legend={
          <Text size="md" fw="bold">
            Create Vendor
          </Text>
        }
        variant="unstyled"
      >
        <TextInput
          label="Vendor Name"
          placeholder="name"
          name="name"
          onChange={vendorForm.handleChange}
          value={vendorForm.values.name}
          withAsterisk
          error={
            vendorForm.touched?.name &&
            vendorForm.errors?.name &&
            vendorForm.errors?.name
          }
        />
        <TextInput
          label="Vendor Code"
          placeholder="code"
          mt="xs"
          name="code"
          onChange={vendorForm.handleChange}
          value={vendorForm.values.code}
          withAsterisk
          error={
            vendorForm.touched?.code &&
            vendorForm.errors?.code &&
            vendorForm.errors?.code
          }
        />
      </Fieldset>
      <Flex align="center" justify="flex-end" gap="md">
        <Button
          variant="subtle"
          onClick={() => onClose()}
          disabled={create.isPending || update.isPending}
        >
          Cancel
        </Button>
        <Button
          onClick={() => vendorForm.handleSubmit()}
          variant="light"
          loading={create.isPending || update.isPending}
          disabled={create.isPending || update.isPending}
        >
          {isEmpty(data) ? "Save" : "Update"}
        </Button>
      </Flex>
    </Stack>
  );
};

export default VendorForm;
