import CustomBadge from "@components/custom-badge";
import Tab from "@components/tab";
import Table from "@components/table";
import { PROJECT_TYPE_NAME } from "@enum/project-type.enum";
import { STATUS_COLOR, STATUS_NAME } from "@enum/status.enum";
import { USER_ROLE } from "@enum/user.role";
import useAuth from "@hook/store/use-auth";
import { Button, Stack, Text } from "@mantine/core";
import { DataTableColumn } from "mantine-datatable";
import { FaUser } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { useSearchParams } from "react-router-dom";
import ProjectListAction from "../components/project-list-action";
import ProjectListHeader from "../components/project-list-header";
import useProjects from "../hooks/use-projects";

const ProjectList = () => {
  const { loginUser } = useAuth();
  const { loading, projects } = useProjects();
  const [, setSearchParams] = useSearchParams();

  const columns: DataTableColumn[] = [
    {
      accessor: "name",
      title: "Project",
      sortable: true,
      textAlign: "left",
      ellipsis: true,
      width: 200,
    },
    {
      accessor: "customer",
      title: "Customer",
      sortable: true,
      textAlign: "left",
      ellipsis: true,
      hidden: loginUser?.role?.toLowerCase() !== USER_ROLE.SALE,
      render: (record: any) => {
        const { customer } = record;
        return (
          <Stack gap={0} align="flex-start">
            <Text tt="capitalize">{customer.name}</Text>
            <Text>{customer.email}</Text>
          </Stack>
        );
      },
    },
    {
      accessor: "type",
      title: "Type",
      sortable: true,
      textAlign: "left",
      ellipsis: true,
      render: (record: any) => {
        const { type } = record;
        return (
          <CustomBadge tooltip={String(PROJECT_TYPE_NAME?.[type] || "")}>
            {PROJECT_TYPE_NAME[type]}
          </CustomBadge>
        );
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
        return (
          <CustomBadge
            tooltip={String(STATUS_NAME?.[status] || "")}
            color={statusColor}
          >
            {STATUS_NAME[status]}
          </CustomBadge>
        );
      },
    },
    {
      accessor: "power_out_watt",
      title: "Watt",
      sortable: true,
      textAlign: "center",
      ellipsis: true,
      hidden: loginUser?.role?.toLowerCase() !== USER_ROLE.ENGINEER,
      render: (record: any) => {
        const { power_out_watt } = record;
        return power_out_watt ? <Text>{power_out_watt} W</Text> : "N/A";
      },
    },
    {
      accessor: "power_out_voltage",
      title: "Voltage",
      sortable: true,
      textAlign: "center",
      ellipsis: true,
      hidden: loginUser?.role?.toLowerCase() !== USER_ROLE.ENGINEER,
      render: (record: any) => {
        const { power_out_voltage } = record;
        return power_out_voltage ? <Text>{power_out_voltage} V</Text> : "N/A";
      },
    },
    {
      accessor: "reserve_power_for",
      title: "Reserve Power",
      sortable: true,
      textAlign: "center",
      ellipsis: true,
      hidden: loginUser?.role?.toLowerCase() !== USER_ROLE.ENGINEER,
      render: (record: any) => {
        const { reserve_power_for } = record;
        return reserve_power_for ? (
          <Text>{reserve_power_for} Days</Text>
        ) : (
          "N/A"
        );
      },
    },
    {
      accessor: "creator",
      title: "Creator",
      sortable: true,
      textAlign: "left",
      ellipsis: true,
      render: (record: any) => {
        const user =
          loginUser?.id === record?.creator?.id
            ? "Self"
            : record?.creator?.name;
        return (
          <Button
            variant="light"
            radius="lg"
            size="xs"
            color={!user ? "red" : "blue"}
          >
            {user}
          </Button>
        );
      },
    },
    {
      accessor: "engineer",
      title: "Engineer",
      sortable: true,
      textAlign: "left",
      ellipsis: true,
      render: (record: any) => {
        const user =
          loginUser?.id === record?.engineer?.id
            ? "Self"
            : record?.engineer?.name;
        const handleAssignClicked = () => {
          setSearchParams({
            modal: "assign_engineer",
          });
        };

        return (
          <Button
            variant="light"
            radius="lg"
            size="xs"
            color={!user ? "red" : "blue"}
            onClick={user ? () => {} : () => handleAssignClicked()}
          >
            {user || "Not Assigned"}
          </Button>
        );
      },
    },
    {
      accessor: "id",
      title: "",
      textAlign: "left",
      width: 50,
      ellipsis: true,
      render: (record: any) => {
        const { id, engineer_id, creator_id, status, quote } = record;
        return (
          <ProjectListAction
            project_user={{
              engineer_id: engineer_id,
              creator_id: creator_id,
            }}
            status={status}
            project_id={id}
            hasQuote={quote?.length > 0 ? true : false}
          />
        );
      },
    },
  ];

  return (
    <Table
      label={
        loginUser?.role?.toLowerCase() === USER_ROLE.SALE ? "Projects" : ""
      }
      headerContent={<ProjectListHeader />}
      headerLeftContent={
        loginUser?.role?.toLowerCase() === USER_ROLE.ENGINEER ? (
          <Tab
            tabs={[
              {
                label: "My Project",
                value: "my",
                icon: <FaUser />,
              },
              {
                label: "Team",
                value: "team",
                icon: <FaUserGroup />,
              },
            ]}
            initial="my"
          />
        ) : null
      }
      columns={columns}
      data={projects || []}
      fetching={loading}
    />
  );
};

export default ProjectList;
