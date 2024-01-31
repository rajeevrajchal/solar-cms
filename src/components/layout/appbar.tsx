import useAuth from "@hook/store/use-auth";
import {
  AppShell,
  Avatar,
  Center,
  Menu,
  Group,
  Flex,
  ActionIcon,
  Loader,
  Text,
  Paper,
  Divider,
} from "@mantine/core";
import AppRoute from "@routes/route.constant";
import { BsLayoutSidebarInset } from "react-icons/bs";

const avatar =
  "https://plus.unsplash.com/premium_photo-1683121366070-5ceb7e007a97?auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&w=500";

interface AppBarProps {
  desktopOpened?: boolean;
  toggleDesktop?: () => void;
  toggleMobileOpened?: () => void;
}

const AppBar = (props: AppBarProps) => {
  const { desktopOpened, toggleDesktop, toggleMobileOpened } = props;
  const { logout, loginUser } = useAuth();

  return (
    <AppShell.Header px="sm">
      <Flex
        h="100%"
        gap={desktopOpened ? "xl" : 80}
        justify="space-between"
        align="center"
        direction="row"
      >
        <Group
          gap="sm"
          preventGrowOverflow={false}
          w={desktopOpened ? 248 : "auto"}
          wrap="nowrap"
        >
          <ActionIcon
            variant="transparent"
            onClick={toggleMobileOpened}
            hiddenFrom="sm"
            size="sm"
            aria-label="Toggle navigation"
            color="black"
          >
            <BsLayoutSidebarInset />
          </ActionIcon>
          <ActionIcon
            variant="transparent"
            size="sm"
            onClick={toggleDesktop}
            color="black"
            visibleFrom="sm"
          >
            <BsLayoutSidebarInset />
          </ActionIcon>
        </Group>
        {loginUser?.id && (
          <Group gap="lg" preventGrowOverflow={false} wrap="nowrap" grow>
            {/* profile button */}
            <Menu shadow="md" width={200} withArrow arrowSize={12}>
              <Menu.Target>
                <Center>
                  <Avatar src={avatar} alt="it's me" size="sm" />
                </Center>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Label>
                  <Paper>
                    <Text size="sm">{loginUser.name}</Text>
                    <Text
                      size="sm"
                      style={{
                        textTransform: "lowercase",
                      }}
                    >
                      {loginUser.role}
                    </Text>
                  </Paper>
                </Menu.Label>
                <Divider />
                <Menu.Item component="a" href={AppRoute.profile} mt="xs">
                  Profile
                </Menu.Item>
                <Menu.Item
                  component="button"
                  variant="filled"
                  color="red"
                  disabled={logout.isPending}
                  onClick={() => logout.mutate()}
                >
                  {logout.isPending ? (
                    <Loader color="red" size="xs" />
                  ) : (
                    " Logout"
                  )}
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        )}
      </Flex>
    </AppShell.Header>
  );
};

export default AppBar;
