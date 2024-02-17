import Table from "@components/table";
import { Button, Group, Stack, Text } from "@mantine/core";
import { ELECTRICLOAD } from "@model/electric_load";
import { USER } from "@model/user";
import LoadTable from "@components/loads/load-table";
import { reduce } from "lodash";
import { DataTableColumn } from "mantine-datatable";
import { STATUS } from "@enum/status.enum";

interface ProjectCustomerElectricLoadProps {
  electric_load: ELECTRICLOAD[];
  customer: USER;
  project_id: string;
  status: STATUS;
}

const columns: DataTableColumn[] = [
  {
    accessor: "name",
    title: "Name [Electric Appliance]",
    sortable: true,
    textAlign: "left",
    ellipsis: true,
  },
  {
    accessor: "watt",
    title: "Watt [W]",
    sortable: true,
    textAlign: "left",
    ellipsis: true,
  },
  {
    accessor: "quantity",
    title: "Quantity",
    sortable: true,
    textAlign: "left",
    ellipsis: true,
  },
  {
    accessor: "hour",
    title: "Hour of use [hr]",
    sortable: true,
    textAlign: "left",
    ellipsis: true,
  },
  {
    accessor: "watt_per_hour",
    title: "Total Watt consume [W]",
    sortable: true,
    textAlign: "left",
    ellipsis: true,
  },
];

const getTotal = (load: ELECTRICLOAD[]) =>
  reduce(
    load,
    (total: number, item: ELECTRICLOAD) => {
      total = total + item.watt_per_hour;
      return total;
    },
    0
  );

const ProjectCustomerElectricLoad = (
  props: ProjectCustomerElectricLoadProps
) => {
  const { electric_load, customer, project_id, status } = props;

  if (electric_load?.length) {
    return (
      <Stack gap={0}>
        <Group align="center" justify="space-between">
          <Text>Total electrical watt consume on customer</Text>
          <Text>{getTotal(electric_load)} Watt</Text>
        </Group>
        <Table columns={columns} data={electric_load} />
      </Stack>
    );
  }

  if (electric_load?.length === 0 && customer?.type === "guest") {
    return (
      <LoadTable
        project_id={project_id}
        loads={electric_load}
        status={status}
      />
    );
  }

  return (
    <Stack justify="flex-start" align="flex-start">
      <Button variant="subtle" tt="capitalize" fullWidth={false}>
        Request Customer to filled there electric load ?
      </Button>
    </Stack>
  );
};

export default ProjectCustomerElectricLoad;
