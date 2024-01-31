import useCustomers from "@hook/data/customer/use-customers";
import {
  Button,
  Divider,
  Fieldset,
  Flex,
  Select,
  Stack,
  TextInput,
  Text,
  Loader,
} from "@mantine/core";
import { USER } from "@model/user";
import { filter, find, map } from "lodash";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

interface CustomerInfoProp {
  continueAsGuest: (guest: string) => void;
  form: any;
}
const CustomerInfo = (props: CustomerInfoProp) => {
  const { form, continueAsGuest } = props;
  const [searchParam] = useSearchParams();
  const { customers, loading } = useCustomers();

  const handleCustomerSelect = (value: string | null) => {
    if (value === null) {
      return;
    }
    const customer: any = find(
      customers,
      (customer: USER) => customer.id === value
    );

    if (customer !== undefined) {
      form.setFieldValue("customer.name", customer.name, true);
      form.setFieldValue("customer.email", customer.email, true);
      form.setFieldValue("customer.phone", customer.phone, true);
      form.setFieldValue("customer.location", customer.location, true);
      form.setFieldValue("customer.customer_id", customer.id, true);
    }
    return value;
  };

  const handleContinueAsGuest = () => {
    const guest: any = find(
      customers,
      (customer: USER) => customer.type === "guest"
    );
    if (guest !== undefined || guest) {
      continueAsGuest(guest.id);
    }
  };

  useEffect(() => {
    if (searchParam.get("c_id") && customers) {
      handleCustomerSelect(searchParam.get("c_id"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParam.get("c_id"), customers]);

  return (
    <Stack gap="md">
      <Flex w="100%" gap="md" align="flex-end">
        <Select
          searchable
          label="Select customer"
          placeholder="Find customer"
          clearable
          value={form.values.customer.customer_id}
          onChange={handleCustomerSelect}
          rightSection={
            loading ? <Loader color="blue" size="xs" type="dots" /> : ""
          }
          w="40%"
          data={[
            ...map(
              filter(customers, (customer) => customer.type !== "guest"),
              (customer: USER) => {
                return {
                  label: `${customer.name} [${customer.email}] [${customer.phone}]`,
                  value: customer.id,
                };
              }
            ),
          ]}
        />
        <>
          <Text size="lg" fw="bold">
            OR
          </Text>
          <Button onClick={handleContinueAsGuest} variant="light">
            Create as Guest Customer
          </Button>
        </>
      </Flex>
      <Divider />
      <Stack>
        <Fieldset legend="Personal information">
          <TextInput
            label="Name"
            placeholder="Customer Name"
            name="customer.name"
            onChange={form.handleChange}
            value={form.values.customer.name}
            withAsterisk
            error={
              form.touched?.customer?.name &&
              form.errors?.customer?.name &&
              form.errors?.customer?.name
            }
          />
          <TextInput
            label="Email"
            placeholder="Email"
            mt="xs"
            name="customer.email"
            onChange={form.handleChange}
            value={form.values.customer.email}
            withAsterisk
            error={
              form.touched?.customer?.email &&
              form.errors?.customer?.email &&
              form.errors?.customer?.email
            }
          />
          <TextInput
            label="Contact"
            placeholder="Mobile Number"
            mt="xs"
            name="customer.phone"
            value={form.values.customer.phone}
            onChange={form.handleChange}
            withAsterisk
            error={
              form.touched?.customer?.phone &&
              form.errors?.customer?.phone &&
              form.errors?.customer?.phone
            }
          />
        </Fieldset>
        <Fieldset legend="Location">
          <TextInput
            label="Address"
            placeholder="Customer Name"
            name="customer.location"
            value={form.values.customer.location}
            onChange={form.handleChange}
            error={
              form.touched?.customer?.location &&
              form.errors?.customer?.location &&
              form.errors?.customer?.location
            }
          />
        </Fieldset>
      </Stack>
    </Stack>
  );
};

export default CustomerInfo;
