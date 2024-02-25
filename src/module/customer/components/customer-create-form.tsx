import useCustomerMutate from "@module/customer/hooks/use-customer-mutate";
import { Button, Fieldset, Flex, Stack, TextInput, Text } from "@mantine/core";
import { USER } from "@model/user";
import createProjectValidation from "@module/project/components/create-form/create-project-validation";
import AppRoute from "@routes/route.constant";
import { useFormik } from "formik";
import { isEmpty } from "lodash";
import { useNavigate } from "react-router-dom";

interface CustomerCreateFormProps {
  data?: Partial<USER>;
}
const CustomerCreateForm = (props: CustomerCreateFormProps) => {
  const { data } = props;

  const navigate = useNavigate();
  const { createCustomer } = useCustomerMutate();

  const customerForm: any = useFormik({
    initialValues: {
      customer: {
        name: data?.name ?? "",
        email: data?.email ?? "",
        phone: data?.phone ?? "",
        location: data?.location ?? "",
      },
    },
    validationSchema: createProjectValidation,
    onSubmit: (values: any) => {
      createCustomer.mutate(values.customer, {
        onSuccess: () => {
          navigate(AppRoute.customers);
        },
      });
    },
  });

  return (
    <Stack>
      <Text size="lg" fw="bold">
        {isEmpty(data) ? "Register new" : "Update"} customer
      </Text>
      <Fieldset legend="Personal information">
        <TextInput
          label="Name"
          placeholder="Customer Name"
          name="customer.name"
          onChange={customerForm.handleChange}
          value={customerForm.values.customer.name}
          withAsterisk
          error={
            customerForm.touched?.customer?.name &&
            customerForm.errors?.customer?.name &&
            customerForm.errors?.customer?.name
          }
        />
        <TextInput
          label="Email"
          placeholder="Email"
          mt="xs"
          name="customer.email"
          onChange={customerForm.handleChange}
          value={customerForm.values.customer.email}
          withAsterisk
          error={
            customerForm.touched?.customer?.email &&
            customerForm.errors?.customer?.email &&
            customerForm.errors?.customer?.email
          }
        />
        <TextInput
          label="Contact"
          placeholder="Mobile Number"
          mt="xs"
          name="customer.phone"
          value={customerForm.values.customer.phone}
          onChange={customerForm.handleChange}
          withAsterisk
          error={
            customerForm.touched?.customer?.phone &&
            customerForm.errors?.customer?.phone &&
            customerForm.errors?.customer?.phone
          }
        />
      </Fieldset>
      <Fieldset legend="Location">
        <TextInput
          label="Address"
          placeholder="Customer Name"
          name="customer.location"
          value={customerForm.values.customer.location}
          onChange={customerForm.handleChange}
          error={
            customerForm.touched?.customer?.location &&
            customerForm.errors?.customer?.location &&
            customerForm.errors?.customer?.location
          }
        />
      </Fieldset>

      <Flex align="center" justify="flex-end" gap="md">
        <Button
          variant="light"
          onClick={() => navigate(AppRoute.customers)}
          disabled={createCustomer.isPending}
        >
          Cancel
        </Button>
        <Button
          onClick={() => customerForm.handleSubmit()}
          loading={createCustomer.isPending}
          disabled={createCustomer.isPending}
        >
          {isEmpty(data) ? "Register" : "Update"}
        </Button>
      </Flex>
    </Stack>
  );
};

export default CustomerCreateForm;
