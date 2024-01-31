import { DataTableColumn } from "mantine-datatable";
import { Text, Badge, Box } from "@mantine/core";
import useAuth from "@hook/store/use-auth";
import { USER_ROLE } from "@enum/user.role";
import { STATUS_COLOR } from "@enum/status.enum";

import Table from "@components/table";
import ProjectListHeader from "@module/project/components/project-list-header";
import ProjectListAction from "@module/project/components/project-list-action";
import { PROJECTS } from "@model/project";

interface CustomerProjectInterface {
  project: PROJECTS[];
}

const CustomerProject = (props: CustomerProjectInterface) => {
  const { project } = props;
  const { loginUser } = useAuth();

  const columns: DataTableColumn[] = [
    {
      accessor: "name",
      title: "Project",
      sortable: true,
      textAlign: "left",
      ellipsis: true,
    },
    {
      accessor: "sun_hour_average",
      title: "Sun Hour Average [h]",
      sortable: true,
      textAlign: "center",
      ellipsis: true,
      hidden: loginUser?.role?.toLowerCase() !== USER_ROLE.ENGINEER,
    },
    {
      accessor: "total_sun_power_need",
      title: "Total Sun Power Required",
      sortable: true,
      textAlign: "center",
      ellipsis: true,
      hidden: loginUser?.role?.toLowerCase() !== USER_ROLE.ENGINEER,
    },
    {
      accessor: "power_out_watt",
      title: "Watt [W]",
      sortable: true,
      textAlign: "center",
      ellipsis: true,
      hidden: loginUser?.role?.toLowerCase() !== USER_ROLE.ENGINEER,
      render: (record: any) => {
        const { power_out_watt } = record;
        return power_out_watt ? <Text>{power_out_watt} W</Text> : "";
      },
    },
    {
      accessor: "power_out_voltage",
      title: "Voltage [V]",
      sortable: true,
      textAlign: "center",
      ellipsis: true,
      hidden: loginUser?.role?.toLowerCase() !== USER_ROLE.ENGINEER,
      render: (record: any) => {
        const { power_out_voltage } = record;
        return power_out_voltage ? <Text>{power_out_voltage} V</Text> : "";
      },
    },
    {
      accessor: "reserve_power_for",
      title: "Reserve Power [Days]",
      sortable: true,
      textAlign: "center",
      ellipsis: true,
      hidden: loginUser?.role?.toLowerCase() !== USER_ROLE.ENGINEER,
      render: (record: any) => {
        const { reserve_power_for } = record;
        return reserve_power_for ? <Text>{reserve_power_for} Days</Text> : "";
      },
    },
    {
      accessor: "status",
      title: "Status",
      sortable: true,
      textAlign: "left",
      ellipsis: true,
      render: (record: any) => {
        const { status } = record;
        const statusColor = STATUS_COLOR[status];
        return <Badge color={statusColor}>{status}</Badge>;
      },
    },
    {
      accessor: "id",
      title: "Action",
      textAlign: "left",
      width: 100,
      ellipsis: true,
      render: (record: any) => {
        const { id, status } = record;
        return <ProjectListAction project_id={id} status={status} />;
      },
    },
  ];

  return (
    <Box p="md" mt="-md">
      <Table
        headerContent={<ProjectListHeader />}
        columns={columns}
        data={project || []}
      />
    </Box>
  );
};

export default CustomerProject;
