import Table from "@components/table";
import { DataTableColumn } from "mantine-datatable";
import { Badge, Text } from "@mantine/core";
import InventoryHeader from "../components/inventory-header";
import useInventories from "@hook/data/inventory/use-inventories";
import InventoryListAction from "../components/inventory-list-action";
import { formatCurrency } from "@utils/functions/format-currency";

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
    accessor: "vendor",
    title: "Vendor",
    sortable: true,
    textAlign: "left",
    ellipsis: true,
    render: (record: any) => {
      return record?.vendor?.name;
    },
  },
  {
    accessor: "category",
    title: "Category",
    sortable: true,
    textAlign: "left",
    ellipsis: true,
    render: (record: any) => {
      return <Badge variant="light">{record?.category}</Badge>;
    },
  },
  {
    accessor: "watt",
    title: "Watt",
    sortable: true,
    textAlign: "left",
    ellipsis: true,
    render: (record: any) => {
      const { watt } = record;
      return watt ? <Text>{watt} W</Text> : "N/A";
    },
  },
  {
    accessor: "voltage",
    title: "Voltage",
    sortable: true,
    textAlign: "left",
    ellipsis: true,
    render: (record: any) => {
      const { voltage } = record;
      return voltage ? <Text>{voltage} V</Text> : "N/A";
    },
  },
  {
    accessor: "ampere",
    title: "Ampere",
    sortable: true,
    textAlign: "left",
    ellipsis: true,
    render: (record: any) => {
      const { voltage } = record;
      return voltage ? <Text>{voltage} A</Text> : "N/A";
    },
  },
  {
    accessor: "selling_cost",
    title: "Sell Cost",
    sortable: true,
    textAlign: "left",
    ellipsis: true,
    render: (record: any) => {
      const { selling_cost } = record;
      return formatCurrency(selling_cost);
    },
  },
  {
    accessor: "max_discount",
    title: "Max Discount",
    sortable: true,
    textAlign: "center",
    ellipsis: true,
    render: (record: any) => {
      const { max_discount } = record;
      return <Text>{max_discount} %</Text>;
    },
  },
  {
    accessor: "max_flat_discount",
    title: "Max Flat Discount",
    sortable: true,
    textAlign: "left",
    ellipsis: true,
    render: (record: any) => {
      const { max_flat_discount } = record;
      return formatCurrency(max_flat_discount);
    },
  },
  {
    accessor: "id",
    title: "",
    sortable: false,
    textAlign: "center",
    ellipsis: true,
    render: (record: any) => {
      const { id } = record;
      return <InventoryListAction inventory_id={id} />;
    },
  },
];

const InventoryList = () => {
  const { loading, inventories } = useInventories();

  return (
    <Table
      label="Inventories"
      headerContent={<InventoryHeader />}
      columns={columns}
      data={inventories || []}
      fetching={loading}
    />
  );
};

export default InventoryList;
