import { Grid, Paper, Stack, Text } from "@mantine/core";
import HomeMatrix from "../components/home-matix";
import QuickMenu from "../components/quick-menu";

// TODO: Add bar chart & pie chart to show the quantity of the quotes and project
// TODO: Also try to work on the project that are create and successfully set approve and online

const app_mode_is_dev = import.meta.env.VITE_APP_MODE === "dev";

const ClientHome = () => {
  return (
    <Grid>
      <Grid.Col
        span={{
          md: app_mode_is_dev ? 9 : 12,
        }}
      >
        <Stack gap="md">
          <QuickMenu />
          {app_mode_is_dev && <HomeMatrix />}
        </Stack>
      </Grid.Col>
      {app_mode_is_dev && (
        <Grid.Col
          span={{
            md: 3,
          }}
        >
          <Paper withBorder h="100%" p="sm">
            <Text fw="bold">Customer Request</Text>
            <Stack>
              <p>the items</p>
            </Stack>
          </Paper>
        </Grid.Col>
      )}
    </Grid>
  );
};

export default ClientHome;
