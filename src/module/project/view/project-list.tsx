import CustomBadge from "@components/custom-badge";
import Tab from "@components/tab";
import Table from "@components/table";
import { PROJECT_TYPE_NAME } from "@enum/project-type.enum";
import { STATUS_COLOR, STATUS_NAME } from "@enum/status.enum";
import { USER_ROLE } from "@enum/user.role";
import useAuth from "@hook/store/use-auth";
import { formatCode } from "@utils/functions/format-code";
import { DataTableColumn } from "mantine-datatable";
import { FaUser } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import ProjectListAction from "../components/project-list-action";
import ProjectListHeader from "../components/project-list-header";
import useProjects from "../hooks/use-projects";
import { formatDate } from "@utils/functions/format-date";

const ProjectList = () => {
  const { loginUser } = useAuth();
  const { loading, projects } = useProjects();

  const columns: DataTableColumn[] = [
    {
      accessor: "code",
      title: "Code",
      sortable: true,
      textAlign: "left",
      ellipsis: true,
      width: 80,
      render: (record: any) => {
        const { code } = record;
        return <p>{formatCode(code)}</p>;
      },
    },
    {
      accessor: "name",
      title: "Project",
      sortable: true,
      textAlign: "left",
      ellipsis: true,
      width: 200,
    },
    {
      accessor: "start_date",
      title: "Start Date",
      sortable: true,
      textAlign: "left",
      ellipsis: true,
      width: 100,
      render: (record: any) => {
        return formatDate(record.start_date, "DD MMM, YYYY");
      }
    },
    {
      accessor: "type",
      title: "Type",
      sortable: true,
      textAlign: "left",
      ellipsis: true,
      width: 100,
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
      width: 100,
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
      accessor: "customer",
      title: "Customer",
      sortable: true,
      textAlign: "left",
      ellipsis: true,
      hidden: loginUser?.role?.toLowerCase() !== USER_ROLE.SALE,
      render: (record: any) => {
        const { customer } = record;
        return customer.name;
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
