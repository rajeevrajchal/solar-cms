import CircularLoader from "@components/loaders/circular";
import { STATUS } from "@enum/status.enum";
import { Stack } from "@mantine/core";
import ProjectDesign from "../components/insight-view/project-design";
import ProjectEquipment from "../components/insight-view/project-equipment";
import ProjectInstallation from "../components/insight-view/project-installation";
import useProject from "../hooks/use-project";

const ProjectInsight = () => {
  const { loading, project } = useProject();

  const insight_screen: any = {
    [STATUS.DESIGN_IN_PROGRESS]: <ProjectDesign project={project} />,
    [STATUS.EQUIPMENT_SELECTION]: <ProjectEquipment project={project} />,
    [STATUS.INSTALLATION_IN_PROGRESS]: <ProjectInstallation />,
  };

  if (loading) {
    return <CircularLoader />;
  }

  return <Stack>{insight_screen[project?.status?.toLowerCase()]}</Stack>;
};

export default ProjectInsight;
