import Dropzone from "@components/dropzone";
import { STATUS } from "@enum/status.enum";
import { Stack } from "@mantine/core";
import { PROJECTS } from "@model/project";
import useProjectMutate from "@module/project/hooks/use-project-mutate";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import ProjectInsightHeader from "./insight-header";

interface ProjectDesignProps {
  project: PROJECTS;
}

const ProjectDesign = (props: ProjectDesignProps) => {
  const { project } = props;
  const navigate = useNavigate();

  const { uploadProjectModel, changeProjectStatus } = useProjectMutate();
  const onBack = () => {
    navigate(-1);
  };

  const skipDesignUpload = () =>
    changeProjectStatus.mutate({
      project_id: project.id,
      status: STATUS.EQUIPMENT_SELECTION,
    });

  const inSightForm: any = useFormik({
    initialValues: {
      design_file: [],
      connection: [],
    },
    validationSchema: Yup.object().shape({
      design_file: Yup.array()
        .min(1, "Design file required")
        .required("Area is required"),
    }),
    onSubmit: (values) => {
      uploadProjectModel.mutate({
        id: project.id,
        connection: values.connection,
        design_file: values.design_file[0],
      });
    },
  });

  return (
    <Stack>
      <ProjectInsightHeader
        project={project}
        withSkip={true}
        onBack={() => onBack()}
        onContinue={() => inSightForm.handleSubmit()}
        onSkipContinue={() => skipDesignUpload()}
      />
      <Dropzone
        showPreview
        maxFiles={1}
        accept={{
          "image/*": [".jpg", ".jpeg", ".png"],
          "application/pdf": [],
        }}
        files={inSightForm.values.design_file}
        setFiles={(files) => inSightForm.setFieldValue("design_file", files)}
      />
    </Stack>
  );
};

export default ProjectDesign;
