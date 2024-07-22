import { Grid, Stack } from "@mantine/core";
import HomeMatrix from "../components/home-matix";
import QuickMenu from "../components/quick-menu";

// TODO: Add bar chart & pie chart to show the quantity of the quotes and project
// TODO: Also try to work on the project that are create and successfully set approve and online

const ClientHome = () => {
  return (
    <Grid>
      <Grid.Col
        span={{
          md: 12,
        }}
      >
        <Stack gap="md">
          <QuickMenu />
          <HomeMatrix />
        </Stack>
      </Grid.Col>
    </Grid>
  );
};

export default ClientHome;
