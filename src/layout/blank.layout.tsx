import { AppShell, Center, Text, Image, Flex } from "@mantine/core";
import { Outlet } from "react-router-dom";
import logo from "@assets/logo/png/logo_transparent.png";

const company = import.meta.env.COMPANY_NAME;

const BlankLayout = () => {
  return (
    <AppShell
      header={{ height: 48 }}
      px="6rem"
      py="lg"
      withBorder={false}
      layout="alt"
    >
      <AppShell.Header>
        <Flex
          justify="flex-start"
          align="center"
          px="6rem"
          h="100%"
          w="100%"
          pos="relative"
        >
          <Center h={32}>
            <Image src={logo} h="100%" alt="Eco Spark" />
          </Center>
        </Flex>
      </AppShell.Header>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
      <AppShell.Footer
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        p={4}
      >
        <Text size="sm">
          Copyright - 2024 - eco-spark{" "}
          {company && `[In association with ${company}]`}
        </Text>
      </AppShell.Footer>
    </AppShell>
  );
};

export default BlankLayout;
