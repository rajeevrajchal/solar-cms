import { ActionIcon, Flex, Paper, SimpleGrid, Text } from "@mantine/core";
import { PROJECT_MODEL } from "@model/project";
import { exportFileFromUrl } from "@utils/functions/export-file";
import { FaDownload, FaRegFileAlt } from "react-icons/fa";

interface ProjectModelProps {
  models: PROJECT_MODEL[];
}

const ProjectModel = (props: ProjectModelProps) => {
  const { models } = props;
  return (
    <SimpleGrid cols={4}>
      {models.map((model: PROJECT_MODEL) => (
        <Paper key={model.id} withBorder p="md">
          <Flex align="center" justify="space-between" gap="md">
            <Flex align="center" justify="center" gap="sm">
              <FaRegFileAlt size={22} />
              <Text>{model.id}</Text>
            </Flex>
            <ActionIcon
              variant="subtle"
              onClick={() => exportFileFromUrl(model.model_url, "hello world")}
            >
              <FaDownload />
            </ActionIcon>
          </Flex>
        </Paper>
      ))}
    </SimpleGrid>
  );
};

export default ProjectModel;
