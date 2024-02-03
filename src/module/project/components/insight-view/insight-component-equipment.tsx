import { Stack } from "@mantine/core";
import ProjectInsightHeader from "./insight-header";
import { PROJECTS } from "@model/project";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import ComponentEquipmentTable from "./components/equipment/component-equipment-table";
import ComponentEquipmentGrid from "./components/equipment/component-equipment-grid";
import useProjectMutate from "@hook/data/project/use-project-mutate";

interface InsightComponentEquipmentProps {
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

const InsightComponentEquipment = (props: InsightComponentEquipmentProps) => {
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

export default InsightComponentEquipment;
