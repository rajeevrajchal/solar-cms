import CircularLoader from "@components/loaders/circular";
import { Stack } from "@mantine/core";
import useProject from "../hooks/use-project";

const ProjectInsight = () => {
  const { loading } = useProject();

  if (loading) {
    return <CircularLoader />;
  }
  return (
    <Stack>
      <p>hello</p>
    </Stack>
  );
};

export default ProjectInsight;
