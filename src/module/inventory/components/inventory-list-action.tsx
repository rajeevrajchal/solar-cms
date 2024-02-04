import Menu from "@components/menu";
import ConfirmationModal from "@components/modal/confirmation-modal";
import useInventoryMutate from "@hook/data/inventory/use-inventory-mutate";
import { ActionIcon, Text } from "@mantine/core";
import AppRoute from "@routes/route.constant";
import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdDelete, MdEdit } from "react-icons/md";

interface InventoryListActionProps {
  inventory_id: string;
}

type MODAL_TYPE = "delete" | null;

const InventoryListAction = (props: InventoryListActionProps) => {
  const { inventory_id } = props;
  const [activeModal, setActiveModal] = useState<MODAL_TYPE>(null);
  const { delete_inventory } = useInventoryMutate();

  const handleMenuItemClick = (key: "delete") => {
    setActiveModal(key);
  };
  const handleMenuClose = () => {
    setActiveModal(null);
  };

  return (
    <>
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
              {
                leftSection: <MdDelete color="red" />,
                children: (
                  <Text className="capitalize" c="red">
                    Delete
                  </Text>
                ),
                onClick: () => handleMenuItemClick("delete"),
                allow: "*",
                disable: false,
              },
            ],
          },
        ]}
      />
      <ConfirmationModal
        opened={activeModal === "delete"}
        close={() => handleMenuClose()}
        confirm={() => delete_inventory.mutate(inventory_id)}
        title="Delete Confirmation"
        description="Are you sure you want to delete this inventory."
      />
    </>
  );
};

export default InventoryListAction;
