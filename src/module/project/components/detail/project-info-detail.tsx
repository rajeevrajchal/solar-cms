import { Flex } from "@mantine/core";
import { PROJECTS } from "@model/project";

interface ProjectInfoDetailProps {
  project: PROJECTS;
}

const ProjectInfoDetail = (props: ProjectInfoDetailProps) => {
  const { project } = props;

  return (
    <Flex justify="space-between" gap="md">
      <pre>{JSON.stringify(project, null, 2)}</pre>
    </Flex>
  );
};

export default ProjectInfoDetail;
