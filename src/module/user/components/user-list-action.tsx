import Menu from "@components/menu";
import { ActionIcon, Text } from "@mantine/core";
import AppRoute from "@routes/route.constant";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaEye } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

interface UserListActionProps {
  user_id: string;
  is_active?: boolean;
}

const UserListAction = (props: UserListActionProps) => {
  const { user_id, is_active } = props;

  return (
    <>
      <Menu
        trigger={
          <ActionIcon
            variant="outline"
            aria-label="Settings"
            disabled={!is_active}
          >
            <BsThreeDotsVertical size={24} />
          </ActionIcon>
        }
        menu={[
          {
            label: "Action",
            items: [
              {
                leftSection: <MdEdit />,
                children: <Text className="capitalize">Edit</Text>,
                component: "a",
                href: AppRoute.user_edit(user_id),
              },
              {
                leftSection: <FaEye />,
                children: <Text className="capitalize">Detail</Text>,
                component: "a",
                href: AppRoute.user_detail(user_id),
              },
            ],
          },
        ]}
      />
    </>
  );
};

export default UserListAction;
