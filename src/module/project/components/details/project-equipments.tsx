import Table from "@components/table";
import { PROJECTS } from "@model/project";
import { formatWatt } from "@utils/functions/fomat-watt";
import { formatCurrency } from "@utils/functions/format-currency";
import { formatVoltage } from "@utils/functions/format-voltage";
import { DataTableColumn } from "mantine-datatable";

interface ProjectEquipmentsProps {
  project: PROJECTS;
}

const columns: DataTableColumn[] = [
  {
    accessor: "name",
    title: "Name",
    sortable: true,
    textAlign: "left",
    ellipsis: true,
    width: 250,
    render: (record: any) => {
      const { name } = record.inventory;
      return name;
    },
  },
  {
    accessor: "category",
    title: "Category",
    sortable: true,
    textAlign: "left",
    ellipsis: true,
    width: 150,
    render: (record: any) => {
      const { category } = record.inventory;
      return category;
    },
  },
  {
    accessor: "nature",
    title: "Nature",
    sortable: true,
    textAlign: "left",
    ellipsis: true,
    width: 150,
    render: (record: any) => {
      const { nature } = record.inventory;
      return nature;
    },
  },
  {
    accessor: "voltage",
    title: "Voltage",
    sortable: true,
    textAlign: "left",
    ellipsis: true,
    width: 150,
    render: (record: any) => {
      const { voltage } = record.inventory;
      return formatVoltage(voltage);
    },
  },
  {
    accessor: "watt",
    title: "Watt",
    sortable: true,
    textAlign: "left",
    ellipsis: true,
    width: 150,
    render: (record: any) => {
      const { watt } = record.inventory;
      return formatWatt(watt);
    },
  },
  {
    accessor: "selling_cost",
    title: "Selling Cost",
    sortable: true,
    textAlign: "left",
    ellipsis: true,
    width: 150,
    render: (record: any) => {
      const { selling_cost } = record.inventory;
      return formatCurrency(selling_cost);
    },
  },
  {
    accessor: "quantity",
    title: "Quantity",
    sortable: true,
    textAlign: "left",
    ellipsis: true,
    width: 100,
    render: (record: any) => {
      const { quantity } = record;
      return quantity;
    },
  },
  {
    accessor: "total",
    title: "Total",
    sortable: true,
    textAlign: "left",
    ellipsis: true,
    width: 150,
    render: (record: any) => {
      const { selling_cost } = record.inventory;
      const total = selling_cost * record.quantity;
      return formatCurrency(total);
    },
  },
];

const ProjectEquipments = (props: ProjectEquipmentsProps) => {
  const { project } = props;

  return (
    <div>
      <Table columns={columns} data={project.equipment} />
    </div>
  );
};

export default ProjectEquipments;
