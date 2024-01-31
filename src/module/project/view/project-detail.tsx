import Tab from "@components/tab";
import { STATUS_COLOR, STATUS_NAME } from "@enum/status.enum";
import useProject from "@hook/data/project/use-project";
import {
  ActionIcon,
  Badge,
  Center,
  Flex,
  Group,
  Loader,
  Stack,
  Text,
} from "@mantine/core";
import { IoMdSettings } from "react-icons/io";
import { MdOutlineElectricBolt, MdOutlinePower } from "react-icons/md";
import { LuComponent } from "react-icons/lu";
import ProjectCustomerElectricLoad from "../components/detail/project-customer-electric-load";
import ProjectInfoDetail from "../components/detail/project-info-detail";
import { formatDate } from "@utils/functions/format-date";
import { FaMapMarkedAlt } from "react-icons/fa";
import { formatNumber } from "@utils/functions/format-number";
import ProjectListAction from "../components/project-list-action";
import ProjectEquipment from "../components/detail/project-equipments";
import ProjectQuote from "../components/detail/project-quote";
import { IoReceiptOutline } from "react-icons/io5";

const ProjectDetail = () => {
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

  const statusColor = STATUS_COLOR[project.status];

  return (
    <Stack gap="sm">
      <Flex align="flex-start" justify="space-between" gap="md">
        <Stack gap="xs">
          <Stack gap={0}>
            <Group align="center">
              <Text size="lg" fw="bold">
                {project?.name}
              </Text>
              <Badge color={statusColor}>{STATUS_NAME[project.status]}</Badge>
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

            {/* power out break */}
            {project?.power_out_watt && (
              <Group align="center" gap="xs">
                <ActionIcon
                  variant="light"
                  aria-label="Power out break"
                  title="Power Out Come"
                >
                  <MdOutlinePower size={22} />
                </ActionIcon>
                <Stack gap={0}>
                  <Text size="sm">Power</Text>
                  <Group>
                    <Group gap={4}>
                      <Text tt="capitalize" size="sm">
                        Watt:
                      </Text>
                      <Text tt="capitalize" size="sm">
                        {formatNumber(project?.power_out_watt)}
                      </Text>
                    </Group>
                    <Group gap={4}>
                      <Text tt="capitalize" size="sm">
                        Voltage:
                      </Text>
                      <Text tt="capitalize" size="sm">
                        {formatNumber(project?.power_out_voltage)}
                      </Text>
                    </Group>
                    <Group gap={4}>
                      <Text tt="capitalize" size="sm">
                        Reserve:
                      </Text>
                      <Text tt="capitalize" size="sm">
                        {project?.reserve_power_for}
                      </Text>
                    </Group>
                  </Group>
                </Stack>
              </Group>
            )}
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
      <Tab
        tabs={[
          {
            label: "Setup",
            icon: <IoMdSettings />,
            value: "setup",
            component: <ProjectInfoDetail project={project} />,
          },
          {
            label: "Load Description",
            icon: <MdOutlineElectricBolt />,
            value: "customer-load",
            component: (
              <ProjectCustomerElectricLoad
                electric_load={project?.electric_load ?? []}
                customer={project?.customer ?? {}}
                project_id={project?.id}
              />
            ),
          },
          {
            label: "Equipment",
            icon: <LuComponent />,
            value: "equipment",
            component: <ProjectEquipment equipment={project.equipment} />,
          },
          {
            label: "Quote",
            icon: <IoReceiptOutline />,
            value: "quote",
            component: <ProjectQuote quote={project.quote} />,
          },
        ]}
        initial="setup"
      />
    </Stack>
  );
};

export default ProjectDetail;
