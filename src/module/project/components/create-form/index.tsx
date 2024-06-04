import useProjectMutate from "@module/project/hooks/use-project-mutate";
import { useFormik } from "formik";
import FormLayout from "./form-layout";
import ProjectInfo from "./project-info";

const ProjectForm = () => {
  const { createProject } = useProjectMutate();

  const projectForm = useFormik({
    initialValues: {
      project: {
        type: "",
        name: "",
        roof_area: 0,
        solar_irradiance: 0,
        shading_factors: 0,
        roof_orientation: "",
        tilt_angle: 0,
        power_out_watt: 0,
        power_out_voltage: 0,
        reserve_power_for: 0,
        electrical_capacity: 0,
        panel_type: "",
        latitude: 0,
        longitude: 0,
      },
    },
    onSubmit: (values) => {
      createProject.mutate(values.project);
    },
  });

  return (
    <FormLayout
      label="Create Project"
      onSubmit={() => projectForm.handleSubmit()}
      loading={false}
    >
      <ProjectInfo form={projectForm} />
    </FormLayout>
  );
};

export default ProjectForm;
