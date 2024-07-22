import { Center, Loader, Stack, Text } from "@mantine/core";
import useProjectPublic from "@module/public/hooks/use-project-public";
import LoadTable from "../../components/loads/load-table";

const ELECTRIC_LOADProject = () => {
  const { loading, error, project } = useProjectPublic();

  if (loading) {
    return (
      <Center>
        <Loader color="blue" size="xl" type="dots" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center>
        <Text>Page not found</Text>
      </Center>
    );
  }

  return (
    <Stack gap="xs" pb="200px">
      <Stack
        align="flex-start"
        justify="space-between"
        pos="sticky"
        top={0}
        left={0}
        w="100%"
        style={{
          zIndex: 99,
        }}
        gap={0}
      >
        <Text size="md" fw="bold" tt="capitalize">
          Hi, {project?.customer?.name}
        </Text>
        <Text>
          Welcome to Solar Studio! We're delighted you've chosen us for your
          electric needs. Enclosed is the form for your electric application.
          Take a moment to review and ensure your personal details are accurate
          before submitting. We're here to support you—don't hesitate to reach
          out if you have any questions. Thank you for entrusting us with your
          application; we're eager to assist you!
        </Text>
      </Stack>
      {/* <ELECTRIC_LOADUserDetail customer={project?.customer} /> */}
      <LoadTable project_id={project.id} loads={project.electric_load} />
    </Stack>
  );
};

export default ELECTRIC_LOADProject;
