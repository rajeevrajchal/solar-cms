import Menu from "@components/menu";
import { ActionIcon, Text } from "@mantine/core";
import { QUOTE } from "@model/quote";
import AppRoute from "@routes/route.constant";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdEdit } from "react-icons/md";

interface QuoteListAction {
  quote: QUOTE;
}

const QuoteListAction = (props: QuoteListAction) => {
  const { quote } = props;

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
            leftSection: <MdEdit />,
            children: <Text className="capitalize">Detail</Text>,
            component: "a",
            href: AppRoute.quote_detail(quote.id),
            allow: "*",
          },
        ]}
      />
    </>
  );
};

export default QuoteListAction;
