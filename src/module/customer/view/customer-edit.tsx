import { Center, Loader, Text } from "@mantine/core";
import CustomerCreateForm from "../components/customer-create-form";
import useCustomer from "../../../hook/data/customer/use-customer";

const CustomerEdit = () => {
  const { loading, error, customer } = useCustomer();

  if (loading) {
    return (
      <Center>
        <Loader color="blue" size="xl" type="dots" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center>
        <Text>Page not found</Text>
      </Center>
    );
  }

  return <CustomerCreateForm data={customer} />;
};

export default CustomerEdit;
