import { APPROVE_QUOTE } from "@api/services/quote.service";
import Menu from "@components/menu";
import ConfirmationModal from "@components/modal/confirmation-modal";
import { QUOTE_STATUS } from "@enum/quote-status.enum";
import { ActionIcon, Text } from "@mantine/core";
import { QUOTE } from "@model/quote";
import useQuoteMutate from "@module/quote/hooks/use-quote-mutate";
import AppRoute from "@routes/route.constant";
import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";
import { IoMdCheckmark, IoMdClose } from "react-icons/io";
import { MdDelete, MdEdit, MdOutlineFileDownload } from "react-icons/md";
import QuoteApprove from "./modal/quote-approve";

interface QuoteListAction {
  quote: QUOTE;
  hideDetail?: boolean;
}

type MODAL_TYPE = "delete" | "accepted" | "rejected" | "customer";

const QuoteListAction = (props: QuoteListAction) => {
  const { quote, hideDetail } = props;
  const [activeModal, setActiveModal] = useState<MODAL_TYPE | null>(null);
  const { deleteQuote, approveQuote, downloadQuote, rejectQuote, shareQuote } =
    useQuoteMutate();

  const handleMenuClose = () => {
    setActiveModal(null);
  };

  const handleMenuItemClick = (action: MODAL_TYPE) => {
    setActiveModal(action);
  };

  const handleApproveQuote = (payload: APPROVE_QUOTE) => {
    approveQuote.mutate(payload, {
      onSuccess: () => {
        setActiveModal(null);
      },
      onError: () => {
        setActiveModal(null);
      },
    });
  };

  const handleRejectedQuote = () => {
    rejectQuote.mutate(quote?.id, {
      onSuccess: () => {
        setActiveModal(null);
      },
      onError: () => {
        setActiveModal(null);
      },
    });
  };

  const shareQuoteToCustomer = () => {
    shareQuote.mutate(quote?.id, {
      onSuccess: () => {
        setActiveModal(null);
      },
      onError: () => {
        setActiveModal(null);
      },
    });
  };

  const handleDeleteQuote = () => {
    deleteQuote.mutate(quote?.id, {
      onSuccess: () => {
        setActiveModal(null);
      },
      onError: () => {
        setActiveModal(null);
      },
    });
  };

  const statusModal: Record<
    string,
    {
      heading: string;
      description: string;
      onClick: (payload?: any) => void;
    }
  > = {
    customer: {
      heading: "Share to customer",
      description:
        "As you share you want to share this quote with the customer",
      onClick: () => shareQuoteToCustomer(),
    },
    rejected: {
      heading: "Reject Quote",
      description: "As per client you want to reject it",
      onClick: () => handleRejectedQuote(),
    },
    accepted: {
      heading: "Accept Quote",
      description:
        "Are you sure you want to mark this quote as customer approve.t",
      onClick: (payload: Omit<APPROVE_QUOTE, "quote_id">) =>
        handleApproveQuote({
          ...payload,
          quote_id: quote.id,
        }),
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
                leftSection: <MdEdit size={22} />,
                children: <Text className="capitalize ml-2">Detail</Text>,
                component: "a",
                href: AppRoute.quote_detail(quote?.id),
                allow: "*",
                disable: hideDetail,
              },
              {
                leftSection: <FaRegUser size={20} />,
                children: (
                  <Text className="capitalize">
                    {quote?.status?.toLocaleLowerCase() === QUOTE_STATUS.SENT
                      ? "Resend"
                      : "Send to customer"}
                  </Text>
                ),
                onClick: () => handleMenuItemClick("customer"),
                allow: "*",
                disable: [
                  QUOTE_STATUS.ACCEPTED,
                  QUOTE_STATUS.REJECTED,
                ].includes(quote?.status?.toLowerCase() as QUOTE_STATUS),
              },
              {
                leftSection: <IoMdCheckmark size={24} />,
                children: <Text className="capitalize">Approve & Order</Text>,
                onClick: () => handleMenuItemClick("accepted"),
                allow: "*",
                disable: [
                  QUOTE_STATUS.ACCEPTED,
                  QUOTE_STATUS.REJECTED,
                ].includes(quote?.status?.toLowerCase() as QUOTE_STATUS),
              },
              {
                leftSection: <IoMdClose size={24} />,
                children: <Text className="capitalize">Reject</Text>,
                onClick: () => handleMenuItemClick("rejected"),
                allow: "*",
                disable: [
                  QUOTE_STATUS.ACCEPTED,
                  QUOTE_STATUS.REJECTED,
                ].includes(quote?.status?.toLowerCase() as QUOTE_STATUS),
              },
              {
                leftSection: <MdOutlineFileDownload size={24} />,
                children: <Text className="capitalize">Download</Text>,
                onClick: () => downloadQuote.mutate(quote?.id),
                allow: "*",
                disable: hideDetail,
              },
              {
                leftSection: <MdDelete color="red" size={24} />,
                children: (
                  <Text className="capitalize" c="red">
                    Delete
                  </Text>
                ),
                onClick: () => handleMenuItemClick("delete"),
                allow: "*",
                disable: [QUOTE_STATUS.ACCEPTED].includes(
                  quote?.status?.toLowerCase() as QUOTE_STATUS
                ),
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
            confirm={() => handleDeleteQuote()}
            title="Delete Confirmation"
            description="Are you sure you want to delete this project. Deleting this project will also delete respective items like quote."
          />

          <ConfirmationModal
            opened={["rejected"].includes(activeModal)}
            close={handleMenuClose}
            confirm={() => statusModal[activeModal]?.onClick()}
            title={statusModal[activeModal]?.heading}
            description={statusModal[activeModal]?.description}
          />

          <ConfirmationModal
            opened={["customer"].includes(activeModal)}
            close={handleMenuClose}
            confirm={() => statusModal[activeModal]?.onClick()}
            title={statusModal[activeModal]?.heading}
            description={statusModal[activeModal]?.description}
          />

          <QuoteApprove
            opened={["accepted"].includes(activeModal)}
            close={handleMenuClose}
            confirm={(payload) => statusModal[activeModal]?.onClick(payload)}
            title={statusModal[activeModal]?.heading}
            loading={approveQuote.isPending}
          />
        </>
      )}
    </>
  );
};

export default QuoteListAction;
