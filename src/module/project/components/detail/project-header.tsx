import CustomBadge from "@components/custom-badge";
import { STATUS_COLOR, STATUS_NAME } from "@enum/status.enum";
import { ActionIcon, Flex, Group, Stack, Text } from "@mantine/core";
import { PROJECTS } from "@model/project";
import { formatDate } from "@utils/functions/format-date";
import { formatNumber } from "@utils/functions/format-number";
import { FaMapMarkedAlt } from "react-icons/fa";
import ProjectListAction from "../project-list-action";

interface ProjectHeaderProps {
  project: PROJECTS;
}

const ProjectHeader = (props: ProjectHeaderProps) => {
  const { project } = props;
  const statusColor = STATUS_COLOR[project.status];

  return (
    <Flex align="flex-start" justify="space-between" gap="md">
      <Stack gap="xs">
        <Stack gap={0}>
          <Group align="center">
            <Text size="lg" fw="bold">
              {project?.name}
            </Text>
            <CustomBadge
              tooltip={String(STATUS_NAME[project.status] || "")}
              color={statusColor}
            >
              {STATUS_NAME[project.status]}
            </CustomBadge>
          </Group>

          {/* project detail */}
          <Group align="center" color="gray" c="gray">
            <Group gap={4}>
              <Text tt="capitalize" size="sm">
                Customer:
              </Text>
              <Text tt="capitalize" size="sm">
                {project?.customer?.name}
              </Text>
            </Group>
            <Group gap={4}>
              <Text tt="capitalize" size="sm">
                Created By:
              </Text>
              <Text tt="capitalize" size="sm">
                {project?.creator?.name}
              </Text>
            </Group>
            {project?.engineer_id && (
              <Group gap={4}>
                <Text tt="capitalize" size="sm">
                  Engineer Associated:
                </Text>
                <Text tt="capitalize" size="sm">
                  {project?.engineer?.name}
                </Text>
              </Group>
            )}
            <Group gap={4}>
              <Text tt="capitalize" size="sm">
                Created Date:
              </Text>
              <Text tt="capitalize" size="sm">
                {formatDate(project.createdAt)}
              </Text>
            </Group>
          </Group>
        </Stack>

        {/* project detail */}
        <Flex gap="md" color="gray" c="gray">
          <Group align="center" gap="xs">
            <ActionIcon variant="light" aria-label="View on map">
              <FaMapMarkedAlt />
            </ActionIcon>
            <Stack gap={0}>
              <Text size="sm">{project?.location || "-"}</Text>
              <Group>
                <Group gap={4}>
                  <Text tt="capitalize" size="sm">
                    Longitude:
                  </Text>
                  <Text tt="capitalize" size="sm">
                    {formatNumber(project?.longitude) || "n/a"}
                  </Text>
                </Group>
                <Group gap={4}>
                  <Text tt="capitalize" size="sm">
                    Latitude:
                  </Text>
                  <Text tt="capitalize" size="sm">
                    {formatNumber(project?.latitude) || "n/a"}
                  </Text>
                </Group>
              </Group>
            </Stack>
          </Group>
        </Flex>
      </Stack>
      <ProjectListAction
        hideDetail={true}
        project_user={{
          creator_id: project.creator_id,
          engineer_id: project.engineer_id,
        }}
        status={project.status}
        project_id={project.id}
      />
    </Flex>
  );
};

export default ProjectHeader;
