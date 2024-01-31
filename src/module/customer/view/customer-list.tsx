import Table from "@components/table";
import CustomerListHeader from "../components/customer-list-header";
import useCustomers from "@hook/data/customer/use-customers";
import { DataTableColumn } from "mantine-datatable";
import CustomerListAction from "../components/customer-list-action";

const columns: DataTableColumn[] = [
  {
    accessor: "name",
    title: "Name",
    sortable: true,
    textAlign: "left",
    ellipsis: true,
  },
  {
    accessor: "email",
    title: "Email",
    sortable: true,
    textAlign: "left",
    ellipsis: true,
  },
  {
    accessor: "phone",
    title: "Phone",
    sortable: true,
    textAlign: "left",
    ellipsis: true,
  },
  {
    accessor: "location",
    title: "Location",
    sortable: true,
    textAlign: "left",
    ellipsis: true,
  },
  {
    accessor: "id",
    title: "Action",
    textAlign: "left",
    width: 100,
    ellipsis: true,
    render: (record: any) => {
      const { id, type } = record;
      return (
        <CustomerListAction customer_id={id} is_guest={type === "guest"} />
      );
    },
  },
];

const CustomerList = () => {
  const { customers, loading } = useCustomers();
  return (
    <Table
      label="Customers"
      headerContent={<CustomerListHeader />}
      columns={columns}
      data={customers || []}
      fetching={loading}
    />
  );
};

export default CustomerList;
