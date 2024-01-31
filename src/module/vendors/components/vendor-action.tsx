import Menu from "@components/menu";
import { ActionIcon, Text } from "@mantine/core";
import AppRoute from "@routes/route.constant";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdEdit } from "react-icons/md";
import { useSearchParams } from "react-router-dom";

interface VendorActionProps {
  vendor_id: string;
}

const VendorAction = (props: VendorActionProps) => {
  const { vendor_id } = props;
  const [, setSearchParams] = useSearchParams();

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
              href: `${AppRoute.vendor}?type=edit&v_id=${vendor_id}`,
              onClick: () => {
                setSearchParams({
                  type: "edit",
                  v_id: vendor_id,
                });
              },
            },
          ],
        },
      ]}
    />
  );
};

export default VendorAction;
