import Tab from "@components/tab";
import { Card, Center, Grid, Loader, Text } from "@mantine/core";
import useCustomer from "@module/customer/hooks/use-customer";
import { FiGrid } from "react-icons/fi";

import { MdHome } from "react-icons/md";
import CustomerInfo from "../components/detail/customer-info";
import CustomerMatrix from "../components/detail/customer-matrix";
import CustomerProject from "../components/detail/customer-project";

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
            fullWidth
            tabs={[
              {
                label: "Metric",
                icon: <MdHome size={20} />,
                value: "metric",
                component: <CustomerMatrix />,
              },
              {
                label: "Project",
                icon: <FiGrid size={20} />,
                value: "project",
                component: (
                  <CustomerProject project={customer?.project ?? []} />
                ),
              },
            ]}
          />
        </Card>
      </Grid.Col>
    </Grid>
  );
};

export default CustomerDetail;
