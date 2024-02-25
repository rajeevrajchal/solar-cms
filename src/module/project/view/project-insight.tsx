import { STATUS } from "@enum/status.enum";
import useProject from "@module/project/hooks/use-project";
import { Center, Loader, Text } from "@mantine/core";
import InfoViewSetup from "../components/insight-view/info-view";
import { PROJECTS } from "@model/project";
import InsightComponentEquipment from "../components/insight-view/insight-component-equipment";
import ProjectDesign from "../components/insight-view/project-design";
import NotFound from "@components/errors/not-found";

export const initialProjectInsightComponent = {
  component_type: "",
  connection_type: "",
  nature: "",
  name: "",
  voltage: "",
  amperage: "",
  loose_connection_factor: "",
  efficiency: "",
  aging: "",
  dod: "",
  operation_temperature: "",
  each_item_rating_volts: "",
  each_item_rating_ampre: "",
  quantity: "",
};

const ProjectInsight = () => {
  const { loading, error, project } = useProject();

  const getView = (project: PROJECTS) => {
    const status = project?.status.toLowerCase();
    switch (status) {
      case STATUS.SITE_SURVEY:
        return <InfoViewSetup project={project} />;
      case STATUS.EQUIPMENT_SELECTION:
        return <InsightComponentEquipment project={project} />;
      case STATUS.DESIGN_IN_PROGRESS:
        return <ProjectDesign project={project} />;
      default:
        return <NotFound />;
    }
  };

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

  return getView(project);
};

export default ProjectInsight;
