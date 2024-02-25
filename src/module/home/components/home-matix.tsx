import { QUOTE_STATUS_NAME } from "@enum/quote-status.enum";
import { STATUS_NAME } from "@enum/status.enum";
import { Card, Flex, Grid, GridCol, Stack, Text } from "@mantine/core";
import { map } from "lodash";
import { BiCategoryAlt } from "react-icons/bi";
import { TbFileInvoice } from "react-icons/tb";

const HomeMatrix = () => {
  return (
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
                      <GridCol span={3} className="flex justify-end items-end">
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
  );
};

export default HomeMatrix;
