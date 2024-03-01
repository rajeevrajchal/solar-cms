import Table from "@components/table";
import { DataTableColumn } from "mantine-datatable";
import OrderHeader from "../components/order-header";
import useOrders from "../hooks/use-orders";

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

const OrderList = () => {
  const { loading, orders } = useOrders();
  return (
    <Table
      label="Orders"
      headerContent={<OrderHeader />}
      columns={columns}
      data={orders || []}
      fetching={loading}
    />
  );
};

export default OrderList;
