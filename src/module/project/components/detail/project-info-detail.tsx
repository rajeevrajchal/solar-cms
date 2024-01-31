import { BATTERY_TYPE_NAME } from "@enum/battery-type.enum";
import { PANEL_TYPE_NAME } from "@enum/panel-type.enum";
import { Badge, Flex, Group, Stack, Text } from "@mantine/core";
import { ELECTRICLOAD } from "@model/electric_load";
import { PROJECTS } from "@model/project";
import { formatNumber } from "@utils/functions/format-number";

interface ProjectInfoDetailProps {
  project: PROJECTS;
}

const calculateTotalWattUsage = (electricLoad: ELECTRICLOAD[]): number => {
  return electricLoad.reduce((acc, current) => {
    const wattConsumeByCurrent =
      current.quantity * current.watt * current.watt_per_hour;
    return acc + wattConsumeByCurrent;
  }, 0);
};

const ProjectInfoDetail = (props: ProjectInfoDetailProps) => {
  const { project } = props;

  return (
    <Flex justify="space-between" gap="md">
      <Stack
        gap="xs"
        style={{
          flex: 1,
        }}
      >
        <Stack gap={0}>
          <Text size="sm" fw="bold">
            Customer's Load
          </Text>
          <Group gap="lg">
            <Group>
              <Text size="sm" w={100}>
                Total Devices
              </Text>
              <Badge variant="light">{project?.electric_load?.length}</Badge>
            </Group>
            <Group>
              <Text size="sm" w="full">
                Total Watt Usage:
              </Text>
              <Badge variant="light">
                {calculateTotalWattUsage(project?.electric_load ?? [])}
              </Badge>
            </Group>
          </Group>
        </Stack>
        <Stack gap={0}>
          <Text size="sm" fw="bold">
            Request Feature
          </Text>
          <Stack gap="4">
            <Group>
              <Text size="sm" w={150}>
                Panel Type:{" "}
              </Text>
              <Badge variant="light">
                {PANEL_TYPE_NAME[project?.panel_info]}
              </Badge>
            </Group>
            <Group>
              <Text size="sm" w={150}>
                Battery Type:{" "}
              </Text>
              <Badge variant="light">
                {BATTERY_TYPE_NAME[project?.battery_type]}
              </Badge>
            </Group>
            <Group>
              <Text size="sm" w={150}>
                {" "}
                Cleaning{" "}
              </Text>
              <Badge variant="light">{project?.cleaning ? "Yes" : "No"}</Badge>
            </Group>
          </Stack>
        </Stack>
        <Stack gap={0}>
          <Text size="sm" fw="bold">
            Properties
          </Text>
          <Stack gap="4">
            <Group>
              <Text size="sm" w={150}>
                Area
              </Text>
              <Text size="sm" w={150}>
                {project?.actual_area
                  ? `${formatNumber(project.actual_area)} ㎡`
                  : " N/A"}
              </Text>
            </Group>
            <Group>
              <Text size="sm" w={150}>
                Sun hour summer:
              </Text>
              <Text size="sm" w={150}>
                {project?.sun_hour_summer
                  ? `${formatNumber(project.sun_hour_summer)} hrs`
                  : " N/A"}
              </Text>
            </Group>
            <Group>
              <Text size="sm" w={150}>
                Sun hour winter
              </Text>
              <Text size="sm" w={150}>
                {project?.sun_hour_winter
                  ? `${formatNumber(project.sun_hour_winter)} hrs`
                  : " N/A"}{" "}
              </Text>
            </Group>
            <Group>
              <Text size="sm" w={150}>
                Sun hour monsoon
              </Text>
              <Text size="sm" w={150}>
                {project?.sun_hour_monsoon
                  ? `${formatNumber(project.sun_hour_monsoon)} hrs`
                  : " N/A"}{" "}
              </Text>
            </Group>
            <Group>
              <Text size="sm" w={150}>
                Sun hour average
              </Text>
              <Text size="sm" w={150}>
                {project?.sun_hour_average
                  ? `${formatNumber(project.sun_hour_average)} hrs`
                  : " N/A"}{" "}
              </Text>
            </Group>
            <Group>
              <Text size="sm" w={150}>
                Sun Direction
              </Text>
              <Text size="sm" w={150}>
                {project.sun_direction || "N/A"}
              </Text>
            </Group>
          </Stack>
        </Stack>
      </Stack>
    </Flex>
  );
};

export default ProjectInfoDetail;
