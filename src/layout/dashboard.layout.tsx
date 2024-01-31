import { useDisclosure, useLocalStorage } from "@mantine/hooks";
import { AppShell, Stack } from "@mantine/core";
import AppBar from "@components/layout/appbar";
import Breadcrumb from "@components/breadcrumb";
import Sidebar from "@components/layout/sidebar";
import { Outlet, useLocation } from "react-router-dom";
import { useLayoutEffect, useState } from "react";

const DashboardLayout = () => {
  const [appSidebar, setAppSidebar] = useLocalStorage<boolean>({
    key: "app-sidebar",
    defaultValue: false,
  });
  const [desktopOpened, toggleDesktop] = useState<boolean>(false);
  const [mobileOpened, { toggle: toggleMobileOpened }] = useDisclosure(false);
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    toggleDesktop(appSidebar as boolean);
  }, [appSidebar]);

  return (
    <AppShell
      header={{ height: 48 }}
      padding="md"
      navbar={{
        width: !desktopOpened ? 80 : 248,
        breakpoint: "sm",
        collapsed: { mobile: !mobileOpened },
      }}
      layout="alt"
    >
      <AppBar
        toggleDesktop={() => {
          toggleDesktop(!desktopOpened);
          setAppSidebar(!desktopOpened);
        }}
        toggleMobileOpened={toggleMobileOpened}
        desktopOpened={desktopOpened}
      />
      <Sidebar
        desktopOpened={desktopOpened}
        mobileOpened={mobileOpened}
        toggleMobileOpened={toggleMobileOpened}
      />
      <AppShell.Main>
        <Stack gap="md">
          {pathname === "/" ? null : <Breadcrumb />}
          <Outlet />
        </Stack>
      </AppShell.Main>
    </AppShell>
  );
};

export default DashboardLayout;
