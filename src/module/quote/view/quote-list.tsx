import Table from "@components/table";
import { DataTableColumn } from "mantine-datatable";
import QuoteHeader from "../components/quote-header";
import useQuotes from "@hook/data/quote/use-quotes";
import { formatCurrency } from "@utils/functions/format-currency";
import {
  QUOTE_STATUS,
  QUOTE_STATUS_COLOR,
  QUOTE_STATUS_NAME,
} from "@enum/quote-status.enum";
import CustomBadge from "@components/custom-badge";
import { formatDate } from "@utils/functions/format-date";
import QuoteListAction from "../components/quote-list-action";
const columns: DataTableColumn[] = [
  {
    accessor: "name",
    title: "Name",
    sortable: true,
    textAlign: "left",
    ellipsis: true,
    width: 300,
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
        QUOTE_STATUS_COLOR[status.toLowerCase() as QUOTE_STATUS];
      return (
        <CustomBadge color={statusColor}>
          {QUOTE_STATUS_NAME[status.toLowerCase() as QUOTE_STATUS]}
        </CustomBadge>
      );
    },
  },
  {
    accessor: "customer.name",
    title: "Customer",
    sortable: true,
    textAlign: "left",
    ellipsis: true,
  },
  {
    accessor: "creator.name",
    title: "Creator",
    sortable: true,
    textAlign: "left",
    ellipsis: true,
  },
  {
    accessor: "discount",
    title: "Discount",
    sortable: true,
    textAlign: "left",
    ellipsis: true,
    render: (record: any) => `${record.discount} %`,
  },
  {
    accessor: "net_total",
    title: "Total",
    sortable: true,
    textAlign: "left",
    ellipsis: true,
    render: (record: any) => formatCurrency(record.net_total),
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
    title: "",
    textAlign: "left",
    width: 50,
    ellipsis: true,
    render: (record: any) => {
      return <QuoteListAction quote_id={record.id} />;
    },
  },
];

const QuoteList = () => {
  const { loading, quotes } = useQuotes();
  return (
    <Table
      label="Quotes"
      headerContent={<QuoteHeader />}
      columns={columns}
      data={quotes || []}
      fetching={loading}
    />
  );
};

export default QuoteList;
