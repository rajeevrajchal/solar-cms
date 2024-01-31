import Table from "@components/table";
import { EQUIPMENT } from "@model/equipment";
import { formatCurrency } from "@utils/functions/format-currency";

interface ProjectEquipmentProps {
  equipment: EQUIPMENT[];
}
const ProjectEquipment = (props: ProjectEquipmentProps) => {
  const { equipment } = props;

  console.log("equipment", equipment);

  return (
    <Table
      columns={[
        {
          accessor: "inventory.name",
          title: "Inventory",
          sortable: true,
          textAlign: "left",
          ellipsis: true,
          width: 500,
          resizable: true,
        },
        {
          accessor: "component",
          title: "Component",
          sortable: true,
          textAlign: "left",
          ellipsis: true,
          footer: "",
        },
        {
          accessor: "connection",
          title: "Connection",
          sortable: true,
          textAlign: "left",
          ellipsis: true,
        },
        {
          accessor: "inventory.voltage",
          title: "Voltage",
          sortable: true,
          textAlign: "left",
          ellipsis: true,
        },
        {
          accessor: "inventory.ampere",
          title: "Ampere",
          sortable: true,
          textAlign: "left",
          ellipsis: true,
        },
        {
          accessor: "inventory.selling_cost",
          title: "Cost",
          sortable: true,
          textAlign: "left",
          ellipsis: true,
          render: (record: any) => {
            return formatCurrency(+record.inventory.selling_cost);
          },
        },
        {
          accessor: "quantity",
          title: "Quantity",
          sortable: true,
          textAlign: "left",
          ellipsis: true,
        },
        {
          accessor: "total",
          title: "Total Cost",
          sortable: true,
          textAlign: "left",
          ellipsis: true,
          render: (record: any) => {
            return formatCurrency(
              +record.inventory.selling_cost * +record.quantity
            );
          },
        },
      ]}
      data={equipment}
    />
  );
};

export default ProjectEquipment;
