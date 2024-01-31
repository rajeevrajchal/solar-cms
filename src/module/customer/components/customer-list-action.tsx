import { ActionIcon, Text } from "@mantine/core";
import Menu from "@components/menu";
import AppRoute from "@routes/route.constant";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaEye } from "react-icons/fa";
import { MdEdit, MdDelete } from "react-icons/md";
import { useState } from "react";
import ConfirmationModal from "@components/modal/confirmation-modal";
import useCustomerMutate from "@hook/data/customer/use-customer-mutate";

interface CustomerListActionProps {
  customer_id: string;
  is_guest: boolean;
}

const CustomerListAction = (props: CustomerListActionProps) => {
  const { customer_id, is_guest } = props;
  const { deleteCustomer } = useCustomerMutate();
  const [deleteModal, setDeleteModal] = useState<boolean>(false);

  const handleCloseModal = () => {
    setDeleteModal(false);
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
                href: AppRoute.customer_edit(customer_id),
              },
              {
                leftSection: <FaEye />,
                children: <Text className="capitalize">Detail</Text>,
                component: "a",
                href: AppRoute.customer_detail(customer_id),
              },
              {
                leftSection: <MdDelete />,
                children: <Text className="capitalize">Delete</Text>,
                disable: is_guest,
                onClick: () => setDeleteModal(true),
              },
            ],
          },
        ]}
      />
      <ConfirmationModal
        opened={deleteModal}
        close={handleCloseModal}
        confirm={() =>
          deleteCustomer.mutate(customer_id, {
            onSuccess: () => {
              handleCloseModal();
            },
          })
        }
        title="Delete Confirmation"
        description="Are you sure you want to delete this customer. Deleting these customer will also delete respective projects."
      />
    </>
  );
};

export default CustomerListAction;
