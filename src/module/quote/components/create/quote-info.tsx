import useProjectForQuote from "@hook/data/project/use-project-for-quote";
import { Flex, Loader, Select, Stack, Text } from "@mantine/core";
import { PROJECTS } from "@model/project";
import ProjectEquipment from "@module/project/components/detail/project-equipments";
import { find, isEmpty, map, reduce } from "lodash";
import { useEffect, useState } from "react";
import QuoteMatrix from "./quote-matrix";
import { EQUIPMENT } from "@model/equipment";
import {
  QUOTE_STATUS,
  QUOTE_STATUS_COLOR,
  QUOTE_STATUS_NAME,
} from "@enum/quote-status.enum";
import CustomBadge from "@components/custom-badge";

interface QuoteInfoProps {
  form: any;
  isEdit?: boolean;
  project_info?: PROJECTS;
  status: QUOTE_STATUS;
}

const getEquipmentTotalCost = (equipments: EQUIPMENT[]) => {
  return reduce(
    equipments,
    (acc: number, current: EQUIPMENT) => {
      const currentCost = current?.quantity * current.inventory?.selling_cost;
      acc += currentCost;
      return acc;
    },
    0
  );
};

const QuoteInfo = (props: QuoteInfoProps) => {
  const { form, project_info, isEdit = true, status } = props;
  const { loading, projects } = useProjectForQuote({
    skip: !isEmpty(project_info),
  });
  const [selectedProject, setSelectedProject] = useState<PROJECTS | null>(null);

  const handleProjectSelect = (value: string | null) => {
    form.setFieldValue("project_id", value);
  };

  const getSelectedProject = () => {
    const project: any =
      find(
        projects || [],
        (item: PROJECTS) => item.id === form.values.project_id
      ) || project_info;
    const total = getEquipmentTotalCost(project?.equipment || []);
    form.setFieldValue("equipment_total", total);
    setSelectedProject(project);
  };

  useEffect(() => {
    getSelectedProject();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.values.project_id, projects]);

  return (
    <Stack>
      <Stack
        bg="#f1f2f3"
        p="sm"
        style={{
          borderRadius: "8px",
        }}
      >
        {isEmpty(project_info) ? (
          <Select
            searchable
            label="Select project"
            placeholder="Type of search project"
            clearable
            value={form.values.project_id}
            onChange={handleProjectSelect}
            rightSection={
              loading ? <Loader color="blue" size="xs" type="dots" /> : ""
            }
            w="40%"
            error={
              form.touched?.project_id &&
              form.errors?.project_id &&
              form.errors?.project_id
            }
            data={map(projects || [], (project: PROJECTS) => {
              return {
                label: project.name,
                value: project.id,
              };
            })}
          />
        ) : (
          <Flex align="center" gap="md">
            <Text fw="bold">{project_info.name}</Text>
            <CustomBadge
              color={QUOTE_STATUS_COLOR[status.toLowerCase() as QUOTE_STATUS]}
            >
              {QUOTE_STATUS_NAME[status.toLowerCase() as QUOTE_STATUS]}
            </CustomBadge>
          </Flex>
        )}
        {form.values.project_id && <QuoteMatrix isEdit={isEdit} form={form} />}
      </Stack>
      {form.values.project_id && (
        <>
          <Stack gap="xs">
            <Text fw="bold">Customer</Text>
            <Stack gap={0}>
              <Flex align="center" gap="md">
                <Text
                  style={{
                    width: "60px",
                  }}
                >
                  Name:
                </Text>
                <Text>{selectedProject?.customer?.name}</Text>
              </Flex>
              <Flex align="center" gap="md">
                <Text
                  style={{
                    width: "60px",
                  }}
                >
                  Email:
                </Text>
                <Text>{selectedProject?.customer?.email}</Text>
              </Flex>
            </Stack>
          </Stack>
          <ProjectEquipment
            hideConnection
            label="Equipments"
            equipment={selectedProject?.equipment || []}
          />
        </>
      )}
    </Stack>
  );
};

export default QuoteInfo;
