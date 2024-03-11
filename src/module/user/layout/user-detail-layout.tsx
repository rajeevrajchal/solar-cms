import CustomBadge from "@components/custom-badge";
import NotFound from "@components/errors/not-found";
import useAuth from "@hook/store/use-auth";
import {
  Avatar,
  Button,
  Card,
  Center,
  Grid,
  Group,
  Loader,
  Stack,
  Text,
} from "@mantine/core";
import { USER } from "@model/user";
import useUser from "@module/user/hooks/use-user";
import AppRoute from "@routes/route.constant";
import { formatDate } from "@utils/functions/format-date";
import { getInitialsName } from "@utils/functions/get-initials-name";
import { ReactElement } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { IoLocation } from "react-icons/io5";
import { MdDateRange, MdOutlineMail } from "react-icons/md";
import { useLocation } from "react-router-dom";

interface UserDetailLayoutProps {
  hasChildren?: boolean;
  children?: (user: USER) => ReactElement;
}

const UserDetailLayout = (props: UserDetailLayoutProps) => {
  const { children, hasChildren } = props;
  const { loading, error, user } = useUser();
  const { logout } = useAuth();
  const { pathname } = useLocation();

  if (loading) {
    return (
      <Center>
        <Loader color="blue" size="xl" type="dots" />
      </Center>
    );
  }

  if (error || !user) {
    return <NotFound />;
  }

  return (
    <Grid
      style={{
        height: "100%",
      }}
    >
      <Grid.Col
        span={{
          base: 12,
          md: hasChildren ? 3 : 12,
        }}
        style={{
          height: "100%",
        }}
      >
        <Center>
          <Card withBorder p={0} w={400}>
            <Stack justify="center" p="md">
              <Center>
                <Avatar color="cyan" radius="md" size="xl">
                  {getInitialsName(user?.name)}
                </Avatar>
              </Center>
              <Center>
                <Stack gap={2} ta="center">
                  <Text fw="bold" size="md">
                    {user?.name}
                  </Text>
                  {user?.role && (
                    <CustomBadge
                      radius="md"
                      p="xs"
                      size="md"
                      tooltip={user?.role}
                    >
                      {user?.role}
                    </CustomBadge>
                  )}
                </Stack>
              </Center>
              <Stack gap="md">
                <Group gap="sm">
                  <MdOutlineMail size={20} />
                  <Text>{user?.email}</Text>
                </Group>
                {user?.phone && (
                  <Group gap="sm">
                    <FaPhoneAlt size={16} />
                    <Text>{user?.phone}</Text>
                  </Group>
                )}
                {user?.location && (
                  <>
                    <Group gap="sm">
                      <IoLocation size={18} />
                      <Text>{user?.location}</Text>
                    </Group>
                    <Button variant="light">View Map</Button>
                  </>
                )}
                <Group gap="sm">
                  <MdDateRange size={20} />
                  <Text>{formatDate(user?.created)}</Text>
                </Group>

                {!pathname.includes("edit") && (
                  <Button
                    component="a"
                    variant={pathname.includes("edit") ? "filled" : "light"}
                    href={
                      pathname.includes("my-account")
                        ? AppRoute.my_account_edit
                        : AppRoute.user_edit(user?.id)
                    }
                  >
                    Edit Profile
                  </Button>
                )}
                {!pathname.includes("my-account") ? (
                  <Button variant="light" color="red">
                    Deactivated
                  </Button>
                ) : (
                  <Button
                    variant="light"
                    color="red"
                    loading={logout.isPending}
                    disabled={logout.isPending}
                    onClick={() => logout.mutate()}
                  >
                    Logout
                  </Button>
                )}
              </Stack>
            </Stack>
          </Card>
        </Center>
      </Grid.Col>
      {hasChildren && children && (
        <Grid.Col
          w="full"
          span={{
            base: 12,
            md: hasChildren ? 9 : 12,
          }}
        >
          <Card withBorder p={0}>
            {children(user)}
          </Card>
        </Grid.Col>
      )}
    </Grid>
  );
};

export default UserDetailLayout;
