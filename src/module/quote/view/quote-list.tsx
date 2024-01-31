import Table from "@components/table";
import { DataTableColumn } from "mantine-datatable";
import QuoteHeader from "../components/quote-header";
import useQuotes from "@hook/data/quote/use-quotes";

const columns: DataTableColumn[] = [
  {
    accessor: "name",
    title: "Name",
    sortable: true,
    textAlign: "left",
    ellipsis: true,
  },
  {
    accessor: "code",
    title: "Code",
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
    render: () => {
      return <p>Action</p>;
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
