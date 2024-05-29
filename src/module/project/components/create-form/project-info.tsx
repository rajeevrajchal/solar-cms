import { PROJECT_TYPE } from "@enum/project-type.enum";
import { Fieldset, Select, Stack } from "@mantine/core";
import { map } from "lodash";
import SolarProject from "./solar-project";

interface ProjectInfoProps {
  form: any;
}

const getQuestionComponent = (form: any) => {
  switch (form.values.project.type) {
    case PROJECT_TYPE.TIDAL:
      return "tidal";
    case PROJECT_TYPE.WIND:
      return "wind";
    case PROJECT_TYPE.SOLAR:
      return <SolarProject form={form} />;
    case PROJECT_TYPE.HYDRO:
      return "hydro";
  }
};

const ProjectInfo = (props: ProjectInfoProps) => {
  const { form } = props;

  return (
    <Stack gap="md">
      <Select
        searchable
        styles={{
          option: {
            textTransform: "capitalize",
          },
        }}
        className="w-44"
        placeholder="Select Type"
        clearable
        value={form.values.project.type}
        data={map(PROJECT_TYPE, (v, k) => ({
          label: k,
          value: v,
        }))}
        onChange={(value) => form.setFieldValue("project.type", value)}
      />
      {form.values.project.type && (
        <Fieldset legend={form.values.project.type} className="capitalize">
          {getQuestionComponent(form)}
        </Fieldset>
      )}
    </Stack>
  );
};

export default ProjectInfo;
