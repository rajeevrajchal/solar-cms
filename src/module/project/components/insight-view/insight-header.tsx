import Collapse from "@components/collapse";
import { panel_type } from "@constant/panel-type";
import { PROJECT_TYPE_COLOR, PROJECT_TYPE_NAME } from "@enum/project-type.enum";
import { STATUS_COLOR, STATUS_NAME } from "@enum/status.enum";
import { Alert, Badge, Button, Flex, Stack, Text } from "@mantine/core";
import { PROJECTS } from "@model/project";
import { formatWatt } from "@utils/functions/fomat-watt";
import { formatArea } from "@utils/functions/format-area";
import { formatDegree } from "@utils/functions/format-degree";
import { formatVoltage } from "@utils/functions/format-voltage";
import { ReactElement } from "react";
import { MdOutlineInfo } from "react-icons/md";

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
    <>
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
      <Collapse
        is_normal_title
        smaller
        content={
          <Alert variant="light">
            <Flex
              align="center"
              rowGap="2"
              columnGap="lg"
              w="fit-content"
              wrap="wrap"
            >
              <Flex align="center" gap="xs">
                <Text className="capitalize">Area:</Text>
                <span className="font-semibold">
                  {formatArea(project?.project_info?.area)}
                </span>
              </Flex>
              <Flex align="center" gap="xs">
                <Text className="capitalize">shading factors:</Text>
                <span className="font-semibold">
                  {project?.project_info?.shading_factors}
                </span>
              </Flex>
              <Flex align="center" gap="xs">
                <Text className="capitalize">solar irradiance:</Text>
                <span className="font-semibold">
                  {project?.project_info?.solar_irradiance}
                </span>
              </Flex>
              <Flex align="center" gap="xs">
                <Text className="capitalize">Tilt Angle:</Text>
                <span className="font-semibold">
                  {formatDegree(project?.project_info?.tilt_angle || 0)}
                </span>
              </Flex>
              <Flex align="center" gap="xs">
                <Text className="capitalize">Voltage:</Text>
                <span className="font-semibold">
                  {formatVoltage(project?.project_info?.power_out_voltage)}
                </span>
              </Flex>
              <Flex align="center" gap="xs">
                <Text className="capitalize">Watt:</Text>
                <span className="font-semibold">
                  {formatWatt(project?.project_info?.power_out_watt)}
                </span>
              </Flex>
              <Flex align="center" gap="xs">
                <Text className="capitalize">reserve power:</Text>
                <span className="font-semibold">
                  {project?.project_info?.reserve_power_for} days
                </span>
              </Flex>
              {project.project_info.panel_type && (
                <Flex align="center" gap="xs">
                  <Text className="capitalize">Panel Type: </Text>
                  <span className="capitalize font-semibold">
                    {panel_type[project.project_info.panel_type]}
                  </span>
                </Flex>
              )}
            </Flex>
          </Alert>
        }
        title={
          <Flex justify="center" gap="xs">
            <MdOutlineInfo size={18} className="mt-[2px]" />
            <Text size="sm">Info</Text>
          </Flex>
        }
      />
    </>
  );
};

export default ProjectInsightHeader;
