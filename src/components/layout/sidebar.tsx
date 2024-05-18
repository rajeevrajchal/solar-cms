import logo from "@assets/logo/png/logo_transparent.png";
import { SidebarItem, sidebarMenu } from "@constant/sidebar";
import useAuth from "@hook/store/use-auth";
import {
  AppShell,
  Box,
  Burger,
  Flex,
  Image,
  NavLink,
  Stack,
} from "@mantine/core";
import { useLocation } from "react-router-dom";

interface SidebarProps {
  desktopOpened: boolean;
  mobileOpened: boolean;
  toggleMobileOpened: () => void;
}

const Sidebar = (props: SidebarProps) => {
  const { desktopOpened, mobileOpened, toggleMobileOpened } = props;
  const { pathname } = useLocation();
  const { loginUser } = useAuth();

  const getSideMenuViaRole: SidebarItem[] = sidebarMenu.filter((item) => {
    if (item?.allow === "*") {
      return true;
    } else {
      return item?.allow?.includes(loginUser?.role?.toLowerCase())
        ? true
        : false;
    }
  });

  return (
    <AppShell.Navbar>
      <Stack gap={0}>
        <Box>
          <Flex
            direction={{ base: "column", sm: "row" }}
            align="flex-end"
            justify="space-between"
          >
            <Burger
              opened={mobileOpened}
              onClick={toggleMobileOpened}
              hiddenFrom="sm"
              size="sm"
            />
            {desktopOpened ? (
              <Box
                px="md"
                className="w-full flex items-center justify-center h-[10vh] gap-2"
              >
                <Image
                  src={logo}
                  h="100%"
                  w="100%"
                  alt="Eco Spark"
                  className="object-contain"
                />
              </Box>
            ) : (
              <div className="w-full h-[10vh]">
                <Image
                  src={logo}
                  h="100%"
                  w="100%"
                  alt="Eco Spark"
                  className="object-contain"
                />
              </div>
            )}
          </Flex>
        </Box>
        <Stack px="md" py="xs">
          {getSideMenuViaRole.map((item: SidebarItem, index: number) => (
            <div key={`${item.key}-${index}`}>
              <NavLink
                label={item.label}
                leftSection={item.icon}
                variant="filled"
                active={
                  (pathname.startsWith(item.href) &&
                    item.href !== "/" &&
                    pathname.includes(`${item.href}/`)) ||
                  pathname === item.href
                }
                style={{
                  borderRadius: "4px",
                }}
                h="lg"
                py="md"
                href={`${item.href}`}
                key={`${item.key}-${index}`}
              />
            </div>
          ))}
        </Stack>
      </Stack>
    </AppShell.Navbar>
  );
};

export default Sidebar;
