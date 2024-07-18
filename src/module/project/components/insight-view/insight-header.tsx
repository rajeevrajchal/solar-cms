import { PROJECT_TYPE_COLOR, PROJECT_TYPE_NAME } from "@enum/project-type.enum";
import { STATUS_COLOR, STATUS_NAME } from "@enum/status.enum";
import {
  Badge,
  Button,
  Flex,
  Stack,
  Text,
  useMantineColorScheme,
} from "@mantine/core";
import { PROJECTS } from "@model/project";
import { formatWatt } from "@utils/functions/fomat-watt";
import { formatArea } from "@utils/functions/format-area";
import { formatDegree } from "@utils/functions/format-degree";
import { formatVoltage } from "@utils/functions/format-voltage";
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
  const { colorScheme } = useMantineColorScheme();

  return (
    <Flex
      align="flex-end"
      justify="space-between"
      gap="md"
      w="100%"
      direction={{
        base: "column",
        md: "row",
      }}
    >
      <Stack className="flex-1" w="100%" gap={0}>
        <Flex align="center" gap="sm" className="flex-1">
          <Text size="lg" fw="bold">
            {project?.name}
          </Text>
          <Badge color={statusColor}>{STATUS_NAME[project?.status]}</Badge>
          <Badge color={PROJECT_TYPE_COLOR[project?.type]}>
            {PROJECT_TYPE_NAME[project?.type]}
          </Badge>
        </Flex>
        <Flex
          align="center"
          rowGap="2"
          columnGap="lg"
          w="fit-content"
          wrap="wrap"
          className={`${
            colorScheme === "light" ? "bg-gray-200" : "bg-gray-600"
          }  rounded-md px-4 py-1`}
        >
          {project?.latitude ? (
            <Flex align="center" gap="xs">
              <Text className="capitalize" fw="bold">
                latitude:
              </Text>
              <Text>{formatDegree(project?.latitude)}</Text>
            </Flex>
          ) : null}
          {project?.longitude ? (
            <Flex align="center" gap="xs">
              <Text className="capitalize" fw="bold">
                longitude:
              </Text>
              <Text>{formatDegree(project?.longitude)}</Text>
            </Flex>
          ) : null}
          <Flex align="center" gap="xs">
            <Text className="capitalize" fw="bold">
              Area:
            </Text>
            <Text>{formatArea(project?.project_info?.area)}</Text>
          </Flex>
          <Flex align="center" gap="xs">
            <Text className="capitalize" fw="bold">
              shading factors:
            </Text>
            <Text>{project?.project_info?.shading_factors}</Text>
          </Flex>
          <Flex align="center" gap="xs">
            <Text className="capitalize" fw="bold">
              solar irradiance:
            </Text>
            <Text>{project?.project_info?.solar_irradiance}</Text>
          </Flex>
          <Flex align="center" gap="xs">
            <Text className="capitalize" fw="bold">
              Tilt Angle:
            </Text>
            <Text>{project?.project_info?.tilt_angle}</Text>
          </Flex>
          <Flex align="center" gap="xs">
            <Text className="capitalize" fw="bold">
              Voltage:
            </Text>
            <Text>
              {formatVoltage(project?.project_info?.power_out_voltage)}
            </Text>
          </Flex>
          <Flex align="center" gap="xs">
            <Text className="capitalize" fw="bold">
              Watt:
            </Text>
            <Text>{formatWatt(project?.project_info?.power_out_watt)}</Text>
          </Flex>
          <Flex align="center" gap="xs">
            <Text className="capitalize" fw="bold">
              reserve power:
            </Text>
            <Text>{project?.project_info?.reserve_power_for} days</Text>
          </Flex>
          <Flex align="center" gap="xs">
            <Text className="capitalize" fw="bold">
              Panel Type
            </Text>
            <Text className="capitalize">
              {project?.project_info?.panel_type}
            </Text>
          </Flex>
        </Flex>
      </Stack>
      <Flex
        justify="flex-end"
        align="center"
        gap="sm"
        w={{
          base: "100%",
          md: "fit-content",
        }}
      >
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
      </Flex>
    </Flex>
  );
};

export default ProjectInsightHeader;
