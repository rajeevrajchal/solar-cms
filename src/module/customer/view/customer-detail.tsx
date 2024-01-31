import Tab from "@components/tab";
import useCustomer from "@hook/data/customer/use-customer";
import { Card, Center, Grid, Loader, Text } from "@mantine/core";
import { FiGrid } from "react-icons/fi";

import CustomerProject from "../components/detail/customer-project";
import { TbFileInvoice } from "react-icons/tb";
import CustomerInfo from "../components/detail/customer-info";
import CustomerQuote from "../components/detail/customer-quote";

const CustomerDetail = () => {
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

  return (
    <Grid
      style={{
        height: "100%",
      }}
    >
      <Grid.Col
        span={3}
        style={{
          height: "100%",
        }}
      >
        <CustomerInfo customer={customer} />
      </Grid.Col>

      <Grid.Col w="full" span={9}>
        <Card withBorder p={0}>
          <Tab
            tabs={[
              {
                label: "Project",
                icon: <FiGrid size={20} />,
                value: "project",
                component: (
                  <CustomerProject project={customer?.project ?? []} />
                ),
              },
              {
                label: "Quote",
                icon: <TbFileInvoice size={20} />,
                value: "quote",
                component: <CustomerQuote quotes={customer?.quote ?? []} />,
              },
            ]}
          />
        </Card>
      </Grid.Col>
    </Grid>
  );
};

export default CustomerDetail;
