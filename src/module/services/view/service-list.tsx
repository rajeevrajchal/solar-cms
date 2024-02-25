import Tab from "@components/tab";
import { Stack } from "@mantine/core";
import { FaUserAstronaut } from "react-icons/fa";
import { GrSystem } from "react-icons/gr";
import { useSearchParams } from "react-router-dom";
import CustomerBooked from "../components/customer-service-configuration";
import SystemService from "../components/system-service";

const ServiceList = () => {
  const [searchParams] = useSearchParams();

  const getView = () => {
    switch (searchParams.get("tab")) {
      case "customer":
        return <CustomerBooked />;
      case "system":
        return <SystemService />;
      default:
        return <CustomerBooked />;
    }
  };

  return (
    <Stack gap={0}>
      <Tab
        tabs={[
          {
            label: "Customer Booked",
            value: "customer",
            icon: <FaUserAstronaut />,
          },
          {
            label: "System",
            value: "system",
            icon: <GrSystem />,
          },
        ]}
        initial="customer"
      />
      {getView()}
    </Stack>
  );
};

export default ServiceList;
