import CustomBadge from "@components/custom-badge";
import {
  Center,
  Card,
  Stack,
  Avatar,
  Group,
  Button,
  Text,
} from "@mantine/core";
import { USER } from "@model/user";
import AppRoute from "@routes/route.constant";
import { formatDate } from "@utils/functions/format-date";
import { getInitialsName } from "@utils/functions/get-initials-name";
import { FaPhoneAlt } from "react-icons/fa";
import { IoLocation } from "react-icons/io5";
import { MdOutlineMail, MdDateRange } from "react-icons/md";
import { useLocation } from "react-router-dom";

interface CustomerInfoProps {
  customer: USER;
}

const CustomerInfo = (props: CustomerInfoProps) => {
  const { customer } = props;
  const { pathname } = useLocation();

  return (
    <Center>
      <Card withBorder p={0} w={400}>
        <Stack justify="center" p="md">
          <Center>
            <Avatar color="cyan" radius="full" size="xl">
              {getInitialsName(customer?.name)}
            </Avatar>
          </Center>
          <Center>
            <Stack gap={2} ta="center">
              <Text fw="bold" size="md">
                {customer?.name}
              </Text>
              {customer?.role && (
                <CustomBadge
                  radius="md"
                  p="xs"
                  size="md"
                  tooltip={customer?.role}
                >
                  {customer?.role}
                </CustomBadge>
              )}
            </Stack>
          </Center>
          <Stack gap="md">
            <Group gap="sm">
              <MdOutlineMail size={20} />
              <Text>{customer?.email}</Text>
            </Group>
            {customer?.phone && (
              <Group gap="sm">
                <FaPhoneAlt size={16} />
                <Text>{customer?.phone}</Text>
              </Group>
            )}
            {customer?.location && (
              <>
                <Group gap="sm">
                  <IoLocation size={18} />
                  <Text>{customer?.location}</Text>
                </Group>
                <Button variant="light">View Map</Button>
              </>
            )}
            <Group gap="sm">
              <MdDateRange size={20} />
              <Text>{formatDate(customer?.created)}</Text>
            </Group>

            <Button
              component="a"
              variant={pathname.includes("edit") ? "filled" : "light"}
              href={AppRoute.customer_edit(customer?.id)}
            >
              Edit Profile
            </Button>

            {customer?.type !== "guest" && (
              <Button variant="light" color="red">
                Deactivated
              </Button>
            )}
          </Stack>
        </Stack>
      </Card>
    </Center>
  );
};

export default CustomerInfo;
