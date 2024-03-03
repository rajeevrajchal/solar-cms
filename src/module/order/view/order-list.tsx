import CustomBadge from "@components/custom-badge";
import Table from "@components/table";
import {
  ORDER_STATUS,
  ORDER_STATUS_COLOR,
  ORDER_STATUS_NAME,
} from "@enum/order-status.enum";
import { Anchor, Flex, Stack, Text } from "@mantine/core";
import AppRoute from "@routes/route.constant";
import { formatCurrency } from "@utils/functions/format-currency";
import { formatDate } from "@utils/functions/format-date";
import { DataTableColumn } from "mantine-datatable";
import OrderAction from "../components/order-action";
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
    accessor: "quote.net_total",
    title: "Order Total Cost ($)",
    sortable: true,
    textAlign: "left",
    ellipsis: true,
    render: (record: any) => formatCurrency(record?.quote?.net_total),
  },
  {
    accessor: "payment",
    title: "Order Payment (%)",
    sortable: true,
    textAlign: "left",
    ellipsis: true,
    render: (record: any) => {
      const {
        payment,
        full_payment,
        quote: { net_total },
      } = record;
      {
        if (payment === null) {
          return (
            <Text size="sm" c="red">
              No Payment is made
            </Text>
          );
        }
        if (full_payment) {
          return (
            <Text size="sm" c="green">
              Payment is completed
            </Text>
          );
        }
        return (
          <Stack gap={0}>
            <Flex gap="sm" c="green">
              <Text size="sm">Received: </Text>
              <Text size="sm">({payment} %)</Text>
              <Text size="sm">
                {formatCurrency((payment / 100) * net_total)}
              </Text>
            </Flex>
            <Flex gap="sm" c="red">
              <Text size="sm">Remaining: </Text>
              <Text size="sm">
                {formatCurrency(+net_total - +(payment / 100) * net_total)}
              </Text>
            </Flex>
          </Stack>
        );
      }
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
    render: (record) => {
      return <OrderAction order={record} />;
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
