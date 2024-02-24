import Menu from "@components/menu";
import useAuth from "@hook/store/use-auth";
import {
  ActionIcon,
  AppShell,
  Avatar,
  Button,
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
import { FaPlus } from "react-icons/fa";
import { MdDesignServices } from "react-icons/md";
import { PiProjectorScreenChartLight } from "react-icons/pi";

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
            {/* quick buttons */}
            <Menu
              position="bottom-end"
              trigger={
                <Button size="xs" leftSection={<FaPlus />}>
                  Start
                </Button>
              }
              menu={[
                {
                  leftSection: <PiProjectorScreenChartLight size={20} />,
                  children: <Text className="capitalize">Create Project</Text>,
                  component: "a",
                  href: AppRoute.create_project,
                },
                {
                  leftSection: <MdDesignServices size={20} />,
                  children: <Text className="capitalize">Book Service</Text>,
                  component: "a",
                  href: AppRoute.book_services,
                },
              ]}
            />
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
                <MMenu.Label>
                  <Paper>
                    <Text size="sm" className="capitalize">
                      {loginUser.name}
                    </Text>
                    <Text size="sm" className="capitalize">
                      {loginUser.role}
                    </Text>
                  </Paper>
                </MMenu.Label>
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
                    " Logout"
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
