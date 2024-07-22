import { Stack } from "@mantine/core";
import { PROJECTS } from "@model/project";
import useProjectMutate from "@module/project/hooks/use-project-mutate";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import ComponentEquipmentGrid from "./components/equipment/component-equipment-grid";
import ComponentEquipmentTable from "./components/equipment/component-equipment-table";
import ProjectInsightHeader from "./insight-header";

interface ProjectEquipmentProps {
  project: PROJECTS;
}
const initialEquipment = {
  component_type: "",
  set_name: "",
  voltage: "",
  watt: "",
  quantity: "",
  connection: "",
  inventory: "",
};

const ProjectEquipment = (props: ProjectEquipmentProps) => {
  const { project } = props;
  const navigate = useNavigate();
  const { assignEquipmentInProject } = useProjectMutate();
  // const matches = useMediaQuery("(min-width: 900px)");

  const equipmentForm: any = useFormik({
    initialValues: {
      equipments: [initialEquipment],
    },
    onSubmit: (values) => {
      assignEquipmentInProject.mutate({
        ...values,
        id: project.id,
      });
    },
  });

  const onBack = () => {
    equipmentForm.resetForm();
    navigate(-1);
  };

  const addItem = () => {
    equipmentForm.setFieldValue("equipments", [
      ...equipmentForm.values.equipments,
      initialEquipment,
    ]);
  };

  const removeItem = (index: number) => {
    const updatedEquipments = [...equipmentForm.values.equipments];
    updatedEquipments.splice(index, 1);
    equipmentForm.setFieldValue("equipments", updatedEquipments);
  };

  const view: any = {
    table: (
      <ComponentEquipmentTable
        equipmentForm={equipmentForm}
        removeItem={removeItem}
        addItem={addItem}
      />
    ),
    grid: (
      <ComponentEquipmentGrid
        equipmentForm={equipmentForm}
        removeItem={removeItem}
        addItem={addItem}
      />
    ),
  };

  return (
    <Stack gap="md" h="full">
      <ProjectInsightHeader
        project={project}
        loading={assignEquipmentInProject.isPending}
        onContinue={() => equipmentForm.handleSubmit()}
        onBack={() => onBack()}
      />
      {view.grid}
    </Stack>
  );
};

export default ProjectEquipment;
