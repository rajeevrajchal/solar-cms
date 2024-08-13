import { panel_type } from "@constant/panel-type";
import { Flex, Grid, Stack, Text } from "@mantine/core";
import { PROJECTS } from "@model/project";
import { formatWatt } from "@utils/functions/fomat-watt";
import { formatArea } from "@utils/functions/format-area";
import { formatDegree } from "@utils/functions/format-degree";
import { formatVoltage } from "@utils/functions/format-voltage";
import { FaRegUserCircle } from "react-icons/fa";
import { LiaMapMarkedAltSolid } from "react-icons/lia";
import { MdOutlineEngineering } from "react-icons/md";

interface ProjectDetailInfoProps {
  project: PROJECTS;
}

const ProjectDetailInfo = (props: ProjectDetailInfoProps) => {
  const { project } = props;

  return (
    <Stack gap="sm">
      <Stack gap="1" className="w-full">
        <Text fw="bold">Users</Text>
        <Stack className="w-full" gap="0">
          {project.customer && (
            <Grid className="w-full">
              <Grid.Col
                span={{
                  base: 6,
                  md: 2,
                }}
                className="flex items-center gap-1 "
              >
                <FaRegUserCircle />
                <span className="text-gray-500">Customer</span>
              </Grid.Col>
              <Grid.Col
                className="font-semibold"
                span={{
                  base: 6,
                  md: 4,
                }}
              >
                {project.customer.name}
              </Grid.Col>
            </Grid>
          )}
          {project.engineer && (
            <Grid className="w-full">
              <Grid.Col
                span={{
                  base: 6,
                  md: 2,
                }}
                className="flex items-center gap-1"
              >
                <MdOutlineEngineering />
                <span className="text-gray-500">Associated Engineer</span>
              </Grid.Col>
              <Grid.Col
                className="font-semibold"
                span={{
                  base: 6,
                  md: 4,
                }}
              >
                {project.engineer?.name}
              </Grid.Col>
            </Grid>
          )}
          {project.sale_user && (
            <Grid className="w-full">
              <Grid.Col
                span={{
                  base: 6,
                  md: 2,
                }}
                className="flex items-center gap-1"
              >
                <FaRegUserCircle />
                <span className="text-gray-500"> Associated Sales Person</span>
              </Grid.Col>
              <Grid.Col
                span={{
                  base: 6,
                  md: 4,
                }}
              >
                {project.sale_user?.name}
              </Grid.Col>
            </Grid>
          )}
        </Stack>
      </Stack>
      <Flex
        direction={{
          base: "column",
          md: "row",
        }}
        gap={{
          base: "sm",
          md: 0,
        }}
        align="start"
        justify="start"
        className="w-full"
      >
        <Stack gap="1" className="w-full md:w-1/3">
          <Text fw="bold">Input</Text>
          <Stack gap="0" className="w-full">
            <Grid>
              <Grid.Col
                span={{
                  base: 6,
                  md: 4,
                }}
                className="text-gray-500"
              >
                Shading Factor
              </Grid.Col>
              <Grid.Col
                span={{
                  base: 6,
                  md: 4,
                }}
                className="font-semibold"
              >
                {project?.project_info?.shading_factors}
              </Grid.Col>
            </Grid>
            <Grid>
              <Grid.Col
                span={{
                  base: 6,
                  md: 4,
                }}
                className="text-gray-500"
              >
                Solar Irradiance
              </Grid.Col>
              <Grid.Col
                className="font-semibold"
                span={{
                  base: 6,
                  md: 4,
                }}
              >
                {formatVoltage(project?.project_info?.solar_irradiance || 0)}
              </Grid.Col>
            </Grid>
            <Grid>
              <Grid.Col
                span={{
                  base: 6,
                  md: 4,
                }}
                className="text-gray-500"
              >
                Tilt Angle
              </Grid.Col>
              <Grid.Col
                className="font-semibold"
                span={{
                  base: 6,
                  md: 4,
                }}
              >
                {formatDegree(project?.project_info?.tilt_angle || 0)}
              </Grid.Col>
            </Grid>
            {project.project_info.panel_type && (
              <Grid>
                <Grid.Col
                  span={{
                    base: 6,
                    md: 4,
                  }}
                  className="text-gray-500"
                >
                  Panel Type
                </Grid.Col>
                <Grid.Col
                  className="font-semibold"
                  span={{
                    base: 6,
                    md: 4,
                  }}
                >
                  {panel_type[project.project_info.panel_type]}
                </Grid.Col>
              </Grid>
            )}
          </Stack>
        </Stack>
        <Stack gap="1" className="w-full md:w-1/3">
          <Text fw="bold">Output</Text>
          <Stack gap="0">
            <Grid>
              <Grid.Col
                span={{
                  base: 6,
                  md: 4,
                }}
                className="text-gray-500"
              >
                Area
              </Grid.Col>
              <Grid.Col
                span={{
                  base: 6,
                  md: 4,
                }}
                className="font-semibold"
              >
                {formatArea(project?.project_info?.area)}
              </Grid.Col>
            </Grid>
            <Grid>
              <Grid.Col
                span={{
                  base: 6,
                  md: 4,
                }}
                className="text-gray-500"
              >
                Voltage
              </Grid.Col>
              <Grid.Col
                span={{
                  base: 6,
                  md: 4,
                }}
                className="font-semibold"
              >
                {formatVoltage(project?.project_info?.power_out_voltage)}
              </Grid.Col>
            </Grid>
            <Grid>
              <Grid.Col
                span={{
                  base: 6,
                  md: 4,
                }}
                className="text-gray-500"
              >
                Watt
              </Grid.Col>
              <Grid.Col
                span={{
                  base: 6,
                  md: 4,
                }}
                className="font-semibold"
              >
                {formatWatt(project?.project_info?.power_out_watt)}
              </Grid.Col>
            </Grid>
            <Grid>
              <Grid.Col
                span={{
                  base: 6,
                  md: 4,
                }}
                className="text-gray-500"
              >
                Reserve Power
              </Grid.Col>
              <Grid.Col
                span={{
                  base: 6,
                  md: 4,
                }}
                className="font-semibold"
              >
                {project?.project_info?.reserve_power_for} Days
              </Grid.Col>
            </Grid>
          </Stack>
        </Stack>
      </Flex>
      {project.location && (
        <Stack gap="1" className="w-full">
          <Flex align="center" gap="2">
            <LiaMapMarkedAltSolid />
            <Text fw="bold">Location</Text>
          </Flex>
          <Stack className="w-full" gap="0">
            <Grid className="w-full">
              <Grid.Col
                span={{
                  base: 6,
                  md: 1,
                }}
                className="text-gray-500"
              >
                Latitude
              </Grid.Col>
              <Grid.Col
                span={{
                  base: 6,
                  md: 4,
                }}
                className="font-semibold"
              >
                {formatDegree(project?.latitude)}
              </Grid.Col>
            </Grid>
            <Grid className="w-full">
              <Grid.Col
                span={{
                  base: 6,
                  md: 1,
                }}
                className="text-gray-500"
              >
                Longitude
              </Grid.Col>
              <Grid.Col
                span={{
                  base: 6,
                  md: 4,
                }}
                className="font-semibold"
              >
                {formatDegree(project?.latitude)}
              </Grid.Col>
            </Grid>
            <Grid className="w-full">
              <Grid.Col
                span={{
                  base: 6,
                  md: 1,
                }}
                className="text-gray-500"
              >
                Location
              </Grid.Col>
              <Grid.Col
                span={{
                  base: 6,
                  md: 4,
                }}
                className="font-semibold"
              >
                {project.location}
              </Grid.Col>
            </Grid>
          </Stack>
        </Stack>
      )}
    </Stack>
  );
};

export default ProjectDetailInfo;
