import type { LoaderProps } from "@mantine/core";
import { Loader, Stack } from "@mantine/core";

const CircularLoader = (props: LoaderProps) => {
  const { size = 30 } = props;
  return (
    <Stack h="100%" w="100%" align="center" justify="center">
      <Loader size={size} />
    </Stack>
  );
};

export default CircularLoader;
