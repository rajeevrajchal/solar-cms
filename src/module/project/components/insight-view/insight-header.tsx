import { STATUS_COLOR, STATUS_NAME } from "@enum/status.enum";
import { Badge, Button, Flex, Group, Stack, Text } from "@mantine/core";
import { PROJECTS } from "@model/project";
import { formatDate } from "@utils/functions/format-date";
import { ReactElement } from "react";

interface ProjectInsightHeaderProps {
  project: PROJECTS;
  onSkipContinue?: () => void;
  onContinue: () => void;
  onBack: () => void;
  withSkip?: boolean;
  loading?: boolean;
  extra?: ReactElement;
}

const ProjectInsightHeader = (props: ProjectInsightHeaderProps) => {
  const {
    project,
    onContinue,
    onSkipContinue,
    onBack,
    loading,
    withSkip,
    extra,
  } = props;
  const statusColor = STATUS_COLOR[project?.status];

  return (
    <Flex align="flex-start" justify="space-between" gap="md" w="100%">
      <Stack gap="xs">
        <Stack gap={0}>
          <Group align="center">
            <Text size="lg" fw="bold">
              {project?.name}
            </Text>
            <Badge color={statusColor}>{STATUS_NAME[project?.status]}</Badge>
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
                {formatDate(project?.createdAt)}
              </Text>
            </Group>
          </Group>
        </Stack>
      </Stack>
      <Group justify="flex-end">
        <Button onClick={onBack} disabled={loading} variant="subtle">
          Back
        </Button>
        {extra}
        <Button onClick={onContinue} disabled={loading} variant="light">
          Continue
        </Button>
        {withSkip && (
          <Button
            onClick={onSkipContinue ?? onContinue}
            disabled={loading}
            loading={loading}
            variant="light"
            color="red"
          >
            Skip & Continue
          </Button>
        )}
      </Group>
    </Flex>
  );
};

export default ProjectInsightHeader;
