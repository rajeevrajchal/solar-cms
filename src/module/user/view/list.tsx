import Table from "@components/table";
import { DataTableColumn } from "mantine-datatable";
import UserTableHeader from "../components/user-header";
import { formatDate } from "@utils/functions/format-date";
import useUsers from "@hook/data/users/use-users";
import UserListAction from "../components/user-list-action";
import UserStatusToggle from "../components/user-status-toggle";
import useAuth from "@hook/store/use-auth";
import { USER } from "@model/user";
import { filter } from "lodash";

const columns: DataTableColumn[] = [
  {
    accessor: "name",
    title: "Name",
    sortable: true,
    textAlign: "left",
    ellipsis: true,
  },
  {
    accessor: "email",
    title: "Email",
    sortable: true,
    textAlign: "left",
    ellipsis: true,
  },
  {
    accessor: "role",
    title: "Role",
    sortable: true,
    textAlign: "left",
    ellipsis: true,
  },
  {
    accessor: "created",
    title: "Enrolled At",
    sortable: true,
    textAlign: "left",
    ellipsis: true,
    render: (record: any) => {
      const { created } = record;
      return formatDate(created);
    },
  },
  {
    accessor: "is_active",
    title: "Active",
    sortable: true,
    textAlign: "left",
    ellipsis: true,
    render: (record: any) => {
      return <UserStatusToggle user={record} />;
    },
  },
  {
    accessor: "id",
    title: "Action",
    textAlign: "left",
    width: 100,
    ellipsis: true,
    render: (record: any) => {
      const { id, is_active } = record;
      return <UserListAction is_active={is_active} user_id={id} />;
    },
  },
];

const UserList = () => {
  const { loginUser } = useAuth();
  const { users, loading } = useUsers();

  return (
    <Table
      label="Users"
      headerContent={<UserTableHeader />}
      columns={columns}
      data={filter(users, (user: USER) => user?.id !== loginUser.id) || []}
      fetching={loading}
    />
  );
};

export default UserList;
