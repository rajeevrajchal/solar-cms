import { QUOTE_STATUS_NAME } from "@enum/quote-status.enum";
import { STATUS_NAME } from "@enum/status.enum";
import { Card, Flex, Grid, GridCol, Paper, Stack, Text } from "@mantine/core";
import AppRoute from "@routes/route.constant";
import { map } from "lodash";
import { BiCategoryAlt } from "react-icons/bi";
import { FaHandshake } from "react-icons/fa";
import { MdDesignServices } from "react-icons/md";
import { TbFileInvoice } from "react-icons/tb";

// TODO: Add bar chart & pie chart to show the quantity of the quotes and project
// TODO: Also try to work on the project that are create and successfully set approve and online
const Home = () => {
  return (
    <Grid>
      <Grid.Col span={9}>
        <Stack gap="md">
          <Stack gap="xs">
            <Text fw="bold">Quick Links</Text>
            <Grid>
              {[
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
              ].map((item, index) => (
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
          <Stack gap="xs">
            <Text fw="bold">Matrix</Text>
            <Grid>
              {[
                {
                  label: "projects",
                  key: "projects",
                  icon: <BiCategoryAlt size={20} />,
                  items: STATUS_NAME,
                },
                {
                  label: "quotes",
                  key: "quotes",
                  icon: <TbFileInvoice size={20} />,
                  items: QUOTE_STATUS_NAME,
                },
              ].map((item, index) => (
                <GridCol span={4} key={`matrix_${index}_${item.key}`}>
                  <Card withBorder>
                    <Stack gap="xs">
                      <Flex align="center" gap={4}>
                        {item.icon}
                        <Text fw="bold" size="sm" className="capitalize">
                          {item.label}
                        </Text>
                      </Flex>
                      <Stack gap={2}>
                        {map(item.items, (v, k) => (
                          <Grid key={`matrix_${index}_${item.key}_status_${k}`}>
                            <GridCol span={9}>
                              <Text key={k} className="capitalize">
                                {v}
                              </Text>
                            </GridCol>
                            <GridCol
                              span={3}
                              className="flex justify-end items-end"
                            >
                              <Text>10</Text>
                            </GridCol>
                          </Grid>
                        ))}
                      </Stack>
                    </Stack>
                  </Card>
                </GridCol>
              ))}
            </Grid>
          </Stack>
        </Stack>
      </Grid.Col>
      <Grid.Col span={3}>
        <Paper withBorder h="100%" p="sm">
          <Text fw="bold">Customer Request</Text>
          <Stack>
            <p>the items</p>
          </Stack>
        </Paper>
      </Grid.Col>
    </Grid>
  );
};

export default Home;
