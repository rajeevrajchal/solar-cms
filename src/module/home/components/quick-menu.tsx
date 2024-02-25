import { Card, Flex, Grid, Stack, Text } from "@mantine/core";
import AppRoute from "@routes/route.constant";
import { BiCategoryAlt } from "react-icons/bi";
import { FaHandshake } from "react-icons/fa";
import { MdDesignServices } from "react-icons/md";
import { TbFileInvoice } from "react-icons/tb";

const quick_link = [
  {
    label: "Project",
    icon: <BiCategoryAlt size={28} />,
    href: AppRoute.projects,
  },
  {
    label: "Services",
    icon: <MdDesignServices size={28} />,
    href: AppRoute.services,
  },
  {
    label: "Quote",
    icon: <TbFileInvoice size={28} />,
    href: AppRoute.quote,
  },
  {
    label: "Order",
    icon: <FaHandshake size={28} />,
    href: AppRoute.order,
  },
];

const QuickMenu = () => {
  return (
    <Stack gap="xs">
      <Text fw="bold">Quick Links</Text>
      <Grid>
        {quick_link.map((item, index) => (
          <Grid.Col
            span={3}
            key={`quick_link_${index}`}
            className="cursor-pointer hover:brightness-95"
          >
            <a href={item.href}>
              <Card padding="sm" radius="md" withBorder>
                <Flex align="center" gap="md">
                  {item.icon}
                  <Text fw="bold" size="sm" className="capitalize">
                    {item.label}
                  </Text>
                </Flex>
              </Card>
            </a>
          </Grid.Col>
        ))}
      </Grid>
    </Stack>
  );
};

export default QuickMenu;
