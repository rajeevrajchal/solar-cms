import Menu from "@components/menu";
import ConfirmationModal from "@components/modal/confirmation-modal";
import useQuoteMutate from "@hook/data/quote/use-quote-mutate";
import { ActionIcon, Text } from "@mantine/core";
import AppRoute from "@routes/route.constant";
import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoMdCheckmark } from "react-icons/io";
import { MdDelete, MdEdit } from "react-icons/md";

interface QuoteListAction {
  quote_id: string;
}

type MODAL_TYPE = "delete" | "status";

const QuoteListAction = (props: QuoteListAction) => {
  const { quote_id } = props;
  const [activeModal, setActiveModal] = useState<MODAL_TYPE | null>(null);
  const { deleteQuote, approveQuote } = useQuoteMutate();

  const handleMenuClose = () => {
    setActiveModal(null);
  };

  const handleMenuItemClick = (action: MODAL_TYPE) => {
    setActiveModal(action);
  };

  return (
    <>
      <Menu
        trigger={
          <ActionIcon variant="subtle" aria-label="More">
            <BsThreeDotsVertical size={24} />
          </ActionIcon>
        }
        menu={[
          {
            label: "Action",
            items: [
              {
                leftSection: <MdEdit />,
                children: <Text className="capitalize">Detail</Text>,
                component: "a",
                href: AppRoute.quote_detail(quote_id),
                allow: "*",
              },
              {
                leftSection: <IoMdCheckmark />,
                children: <Text className="capitalize">Approve</Text>,
                onClick: () => handleMenuItemClick("status"),
                allow: "*",
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
              },
            ],
          },
        ]}
      />

      {activeModal !== null && (
        <>
          <ConfirmationModal
            opened={activeModal === "delete"}
            close={handleMenuClose}
            confirm={() => deleteQuote.mutate(quote_id)}
            title="Delete Confirmation"
            description="Are you sure you want to delete this project. Deleting this project will also delete respective items like quote."
          />

          <ConfirmationModal
            opened={activeModal === "status"}
            close={handleMenuClose}
            confirm={() => approveQuote.mutate(quote_id)}
            title="Approve Quote"
            description="Are you sure you want to mark this quote as customer approve."
          />
        </>
      )}
    </>
  );
};

export default QuoteListAction;
