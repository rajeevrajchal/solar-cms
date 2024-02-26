import Table from "@components/table";
import { Button, Flex } from "@mantine/core";
import { DataTableColumn } from "mantine-datatable";
import { GrDocumentConfig } from "react-icons/gr";

const columns: DataTableColumn[] = [
  {
    accessor: "name",
    title: "Name",
    sortable: true,
    textAlign: "left",
    ellipsis: true,
  },
  {
    accessor: "amount",
    title: "Amount",
    sortable: true,
    textAlign: "left",
    ellipsis: true,
  },
  {
    accessor: "description",
    title: "Description",
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

const SystemService = () => {
  return (
    <Table
      label="Customer Service Configuration"
      headerContent={
        <Flex>
          <Button leftSection={<GrDocumentConfig size={20} />} variant="light">
            Create Service Configuration
          </Button>
        </Flex>
      }
      columns={columns}
      data={[]}
      fetching={false}
    />
  );
};

export default SystemService;
