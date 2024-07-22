import ColorSwitch from "@components/color-switch";
import useAuth from "@hook/store/use-auth";
import {
  ActionIcon,
  AppShell,
  Avatar,
  Center,
  Divider,
  Flex,
  Group,
  Loader,
  Menu as MMenu,
  Paper,
  Text,
} from "@mantine/core";
import AppRoute from "@routes/route.constant";
import { getInitialsName } from "@utils/functions/get-initials-name";
import { BsLayoutSidebarInset } from "react-icons/bs";

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
          >
            <BsLayoutSidebarInset />
          </ActionIcon>
          <ActionIcon
            variant="transparent"
            size="sm"
            onClick={toggleDesktop}
            visibleFrom="sm"
          >
            <BsLayoutSidebarInset />
          </ActionIcon>
        </Group>
        {loginUser?.id && (
          <Group gap="md" preventGrowOverflow={false} wrap="nowrap">
            {/* {(loginUser?.role?.toLowerCase() as USER_ROLE) !==
              USER_ROLE.ADMIN && (
              <Menu
                position="bottom-end"
                trigger={
                  <Button
                    variant="transparent"
                    size="xs"
                    leftSection={<FaPlus />}
                  >
                    Quick Start
                  </Button>
                }
                menu={[
                  {
                    leftSection: <PiProjectorScreenChartLight size={20} />,
                    children: (
                      <Text className="capitalize">Create Project</Text>
                    ),
                    component: "a",
                    href: AppRoute.create_project,
                  },
                ]}
              />
            )} */}
            <ColorSwitch />
            {/* profile button */}
            <MMenu shadow="md" width={200} withArrow arrowSize={12}>
              <MMenu.Target>
                <Center>
                  <Avatar color="cyan" alt={loginUser.name} size="sm">
                    {getInitialsName(loginUser.name)}
                  </Avatar>
                </Center>
              </MMenu.Target>
              <MMenu.Dropdown>
                <Paper p="sm">
                  <Text size="sm" className="capitalize">
                    {loginUser.name}
                  </Text>
                  <Text size="sm" className="capitalize">
                    {loginUser.role}
                  </Text>
                </Paper>
                <Divider />
                <MMenu.Item component="a" href={AppRoute.profile} mt="xs">
                  Profile
                </MMenu.Item>
                <MMenu.Item
                  component="button"
                  variant="filled"
                  color="red"
                  disabled={logout.isPending}
                  onClick={() => logout.mutate()}
                >
                  {logout.isPending ? (
                    <Loader color="red" size="xs" />
                  ) : (
                    "Logout"
                  )}
                </MMenu.Item>
              </MMenu.Dropdown>
            </MMenu>
          </Group>
        )}
      </Flex>
    </AppShell.Header>
  );
};

export default AppBar;
