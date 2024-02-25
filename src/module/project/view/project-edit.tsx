import useProject from "@module/project/hooks/use-project";
import { Center, Loader, Text } from "@mantine/core";
import ProjectForm from "../components/create-form";

const ProjectEdit = () => {
  const { loading, error, project } = useProject();

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

  return <ProjectForm hideCustomer data={project} />;
};

export default ProjectEdit;
