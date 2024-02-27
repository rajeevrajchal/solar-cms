import Table from "@components/table";
import { Button, Flex } from "@mantine/core";
import { DataTableColumn } from "mantine-datatable";
import { GrDocumentConfig } from "react-icons/gr";
import useServiceConfiguration from "../hooks/use-service-configuration";

const columns: DataTableColumn[] = [
  {
    accessor: "name",
    title: "Name",
    sortable: true,
    textAlign: "left",
    ellipsis: true,
  },
  {
    accessor: "status",
    title: "Status",
    sortable: true,
    textAlign: "left",
    ellipsis: true,
  },
  {
    accessor: "customer.name",
    title: "Customer",
    sortable: true,
    textAlign: "left",
    ellipsis: true,
  },
  {
    accessor: "createdAt",
    title: "Created At",
    sortable: true,
    textAlign: "left",
    ellipsis: true,
  },
  {
    accessor: "id",
    title: "Actions",
    textAlign: "left",
    width: 100,
    ellipsis: true,
    render: () => {
      return <p>this is action</p>;
    },
  },
];

const ServiceList = () => {
  const { isLoading, service_configuration } = useServiceConfiguration();

  return (
    <Table
      label="Customer Service Configuration"
      headerContent={
        <Flex>
          <Button leftSection={<GrDocumentConfig size={20} />} variant="light">
            Service Booking
          </Button>
        </Flex>
      }
      columns={columns}
      data={service_configuration || []}
      fetching={isLoading}
    />
  );
};

export default ServiceList;
