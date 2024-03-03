import Menu from "@components/menu";
import ConfirmationModal from "@components/modal/confirmation-modal";
import { ORDER_STATUS } from "@enum/order-status.enum";
import { ActionIcon, Text } from "@mantine/core";
import useQuoteMutate from "@module/quote/hooks/use-quote-mutate";
import AppRoute from "@routes/route.constant";
import { useState } from "react";
import { BsArrowRepeat, BsThreeDotsVertical } from "react-icons/bs";
import { FaRegEye } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import {
  MdOutlineFileDownload,
  MdOutlinePauseCircle,
  MdOutlinePayments,
} from "react-icons/md";

interface OrderActionProps {
  order: any;
}

type MODAL_TYPE =
  | "on_hold"
  | "cancel"
  | "re_order"
  | "delete"
  | "payment"
  | null;

const OrderAction = (props: OrderActionProps) => {
  const { order } = props;
  const { downloadQuote } = useQuoteMutate();
  const [activeModal, setActiveModal] = useState<MODAL_TYPE | null>(null);

  const handleMenuClose = () => {
    setActiveModal(null);
  };

  const handleMenuItemClick = (action: MODAL_TYPE) => {
    setActiveModal(action);
  };

  const statusModal: Record<
    string,
    {
      heading: string;
      description: string;
      onClick: (payload?: any) => void;
    }
  > = {
    cancel: {
      heading: "Cancel",
      description: "As per the client, you want to reject it",
      onClick: () => console.log("cancel"),
    },
    delete: {
      heading: "Delete",
      description: "As per the client, you want to delete it",
      onClick: () => console.log("delete"), // Corrected onClick function
    },
    re_order: {
      heading: "Re order",
      description:
        "Are you sure you want to mark this quote as customer approved?",
      onClick: () => console.log("re-order"),
    },
    on_hold: {
      heading: "On hold",
      description: "Are you sure you want to mark this quote as on hold?",
      onClick: () => console.log("on hold"), // Corrected onClick function
    },
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
                leftSection: <FaRegEye size={22} />,
                children: <Text className="capitalize ml-2">Detail</Text>,
                component: "a",
                href: AppRoute.order_detail(order.id),
                allow: "*",
                disable: true,
              },
              {
                leftSection: <IoMdClose size={24} />,
                children: <Text className="capitalize">Cancel order</Text>,
                onClick: () => handleMenuItemClick("cancel"),
                allow: "*",
                disable: [ORDER_STATUS.CANALED].includes(
                  order?.status?.toLowerCase() as ORDER_STATUS
                ),
              },
              {
                leftSection: <MdOutlinePauseCircle size={24} />,
                children: <Text className="capitalize">On Hold</Text>,
                onClick: () => handleMenuItemClick("on_hold"),
                allow: "*",
                disable: [ORDER_STATUS.CANALED, ORDER_STATUS.ON_HOLD].includes(
                  order?.status?.toLowerCase() as ORDER_STATUS
                ),
              },
              {
                leftSection: <BsArrowRepeat size={24} />,
                children: <Text className="capitalize">Re Order</Text>,
                onClick: () => handleMenuItemClick("re_order"),
                allow: "*",
                disable: [ORDER_STATUS.ORDERED].includes(
                  order?.status?.toLowerCase() as ORDER_STATUS
                ),
              },
              {
                leftSection: <MdOutlinePayments size={24} />,
                children: <Text className="capitalize">Update Payment</Text>,
                onClick: () => handleMenuItemClick("payment"),
                allow: "*",
              },
              {
                leftSection: <MdOutlineFileDownload size={24} />,
                children: <Text className="capitalize">Download</Text>,
                onClick: () => downloadQuote.mutate(order?.quote?.id),
                allow: "*",
              },
            ],
          },
        ]}
      />
      {activeModal !== null && (
        <>
          <ConfirmationModal
            opened={activeModal !== null}
            close={handleMenuClose}
            confirm={() => statusModal[activeModal]?.onClick()}
            title={statusModal[activeModal]?.heading}
            description={statusModal[activeModal]?.description}
          />
        </>
      )}
    </>
  );
};

export default OrderAction;
