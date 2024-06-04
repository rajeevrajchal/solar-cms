import { PROJECT_TYPE } from "@enum/project-type.enum";
import { Fieldset, Stack } from "@mantine/core";
import BasicProjectInput from "./types/basic-project-input";
import ProjectGeneralInfo from "./types/project-general-info";
import ProjectLocation from "./types/project-location";
import SolarProject from "./types/solar-project";

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
      <ProjectGeneralInfo form={form} />
      {form.values.project.type && (
        <>
          <Fieldset legend={form.values.project.type} className="capitalize">
            {getQuestionComponent(form)}
          </Fieldset>
          <BasicProjectInput form={form} />
          <ProjectLocation form={form} />
        </>
      )}
    </Stack>
  );
};

export default ProjectInfo;
