import CustomBadge from "@components/custom-badge";
import Table from "@components/table";
import {
  ORDER_STATUS,
  ORDER_STATUS_COLOR,
  ORDER_STATUS_NAME,
} from "@enum/order-status.enum";
import { Anchor } from "@mantine/core";
import AppRoute from "@routes/route.constant";
import { formatDate } from "@utils/functions/format-date";
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
    render: (record: any) => {
      const { status } = record;
      const statusColor =
        ORDER_STATUS_COLOR[status.toLowerCase() as ORDER_STATUS];
      return (
        <CustomBadge color={statusColor}>
          {ORDER_STATUS_NAME[status.toLowerCase() as ORDER_STATUS]}
        </CustomBadge>
      );
    },
  },
  {
    accessor: "quote.name",
    title: "Quote",
    sortable: true,
    textAlign: "left",
    ellipsis: true,
    render: (record: any) => {
      const { name, id } = record.quote;
      return <Anchor href={AppRoute.quote_detail(id)}>{name}</Anchor>;
    },
  },
  {
    accessor: "createdAt",
    title: "Created At",
    sortable: true,
    textAlign: "left",
    ellipsis: true,
    render: (record: any) => formatDate(record.createdAt),
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
