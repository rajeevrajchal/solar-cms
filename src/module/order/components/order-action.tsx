import { ORDER_INPUT } from "@api/services/order.service";
import Menu from "@components/menu";
import ConfirmationModal from "@components/modal/confirmation-modal";
import { ORDER_STATUS } from "@enum/order-status.enum";
import { ActionIcon, Text } from "@mantine/core";
import useQuoteMutate from "@module/quote/hooks/use-quote-mutate";
import AppRoute from "@routes/route.constant";
import { includes } from "lodash";
import { useState } from "react";
import { BsArrowRepeat, BsThreeDotsVertical } from "react-icons/bs";
import { FaRegEye } from "react-icons/fa";
import {
  MdDelete,
  MdOutlineFileDownload,
  MdOutlinePauseCircle,
  MdOutlinePayments,
} from "react-icons/md";
import useOrderMutate from "../hooks/use-order-mutate";
import OrderPayment from "./modal/order-payment";
import OrderStatusChange from "./modal/order-status-change";

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
  const { updateOrder, orderStatusChange } = useOrderMutate();
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
      description: "Are you sure you want to cancel this order.",
      onClick: (values) => {
        orderStatusChange.mutate(
          {
            ...values,
            status_type: "canaled",
            order_id: order.id,
          },
          {
            onSuccess: () => {
              handleMenuClose();
            },
          }
        );
      },
    },
    delete: {
      heading: "Delete",
      description: "Are you sure you want to delete this order.",
      onClick: () => console.log("delete"), // Corrected onClick function
    },
    re_order: {
      heading: "Re order",
      description: "Confirm you marked to reorder this order.",
      onClick: (values) => {
        orderStatusChange.mutate(
          {
            ...values,
            status_type: "ordered",
            order_id: order.id,
          },
          {
            onSuccess: () => {
              handleMenuClose();
            },
          }
        );
      },
    },
    on_hold: {
      heading: "On hold",
      description: "Please confirm that you want to hold this order.",
      onClick: (values) => {
        console.log("the value is", values);
        orderStatusChange.mutate(
          {
            ...values,
            status_type: "on_hold",
            order_id: order.id,
          },
          {
            onSuccess: () => {
              handleMenuClose();
            },
          }
        );
      },
    },
    payment: {
      heading: "Update Payment",
      description: "Change the payment",
      onClick: (values) => {
        updateOrder.mutate(
          {
            ...values,
            order_id: order.id,
          },
          {
            onSuccess: () => {
              handleMenuClose();
            },
          }
        );
      },
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
              // {
              //   leftSection: <IoMdClose size={24} />,
              //   children: <Text className="capitalize">Cancel order</Text>,
              //   onClick: () => handleMenuItemClick("cancel"),
              //   allow: "*",
              //   disable: [
              //     ORDER_STATUS.CANALED,
              //     ORDER_STATUS.PAYMENT_DONE,
              //   ].includes(order?.status?.toLowerCase() as ORDER_STATUS),
              // },
              {
                leftSection: <MdOutlinePauseCircle size={24} />,
                children: <Text className="capitalize">On Hold</Text>,
                onClick: () => handleMenuItemClick("on_hold"),
                allow: "*",
                disable: [
                  ORDER_STATUS.CANALED,
                  ORDER_STATUS.ON_HOLD,
                  ORDER_STATUS.PAYMENT_DONE,
                ].includes(order?.status?.toLowerCase() as ORDER_STATUS),
              },
              {
                leftSection: <BsArrowRepeat size={24} />,
                children: <Text className="capitalize">Re Order</Text>,
                onClick: () => handleMenuItemClick("re_order"),
                allow: "*",
                disable: [
                  ORDER_STATUS.ORDERED,
                  ORDER_STATUS.PAYMENT_DONE,
                ].includes(order?.status?.toLowerCase() as ORDER_STATUS),
              },
              {
                leftSection: <MdOutlinePayments size={24} />,
                children: <Text className="capitalize">Update Payment</Text>,
                onClick: () => handleMenuItemClick("payment"),
                allow: "*",
                disable: [ORDER_STATUS.PAYMENT_DONE].includes(
                  order?.status?.toLowerCase() as ORDER_STATUS
                ),
              },
              {
                leftSection: <MdOutlineFileDownload size={24} />,
                children: <Text className="capitalize">Download</Text>,
                onClick: () => downloadQuote.mutate(order?.quote?.id),
                allow: "*",
              },
              {
                leftSection: <MdDelete size={24} className="text-red-400" />,
                children: (
                  <Text className="capitalize" c="red">
                    Delete Order
                  </Text>
                ),
                onClick: () => handleMenuItemClick("delete"),
                disable: ![ORDER_STATUS.CANALED].includes(
                  order?.status?.toLowerCase() as ORDER_STATUS
                ),
                allow: "*",
              },
            ],
          },
        ]}
      />
      {activeModal !== null && activeModal === "re_order" && (
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

      {activeModal !== null && includes(["on_hold", "cancel"], activeModal) && (
        <>
          <OrderStatusChange
            opened={activeModal !== null}
            close={handleMenuClose}
            confirm={(values) => statusModal[activeModal]?.onClick(values)}
            title={statusModal[activeModal]?.heading}
            description={statusModal[activeModal]?.description}
          />
        </>
      )}
      {activeModal === "payment" && (
        <>
          <OrderPayment
            opened={activeModal !== null}
            close={handleMenuClose}
            confirm={(payload: ORDER_INPUT) =>
              statusModal.payment.onClick(payload)
            }
            title={statusModal[activeModal]?.heading}
          />
        </>
      )}
    </>
  );
};

export default OrderAction;
