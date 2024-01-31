import Menu from "@components/menu";
import { ActionIcon, Text } from "@mantine/core";
import AppRoute from "@routes/route.constant";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdEdit } from "react-icons/md";

interface InventoryListActionProps {
  inventory_id: string;
}

const InventoryListAction = (props: InventoryListActionProps) => {
  const { inventory_id } = props;
  return (
    <Menu
      trigger={
        <ActionIcon variant="subtle" aria-label="Settings">
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
              href: AppRoute.inventory_edit(inventory_id),
            },
          ],
        },
      ]}
    />
  );
};

export default InventoryListAction;
