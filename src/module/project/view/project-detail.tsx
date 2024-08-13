import CustomBadge from "@components/custom-badge";
import CircularLoader from "@components/loaders/circular";
import Tab from "@components/tab";
import { project_type } from "@constant/project-type";
import { PROJECT_TYPE_NAME } from "@enum/project-type.enum";
import { STATUS_COLOR, STATUS_NAME } from "@enum/status.enum";
import ProjectEquipments from "../components/details/project-equipments";
import ProjectDetailInfo from "../components/details/project-info";
import SubProjects from "../components/details/sub-project";
import useProject from "../hooks/use-project";

const ProjectDetail = () => {
  const { loading, project } = useProject();
  if (loading) {
    return <CircularLoader />;
  }
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <span>{project_type[project.type.toLowerCase()].icon}</span>
          <p className="font-bold text-lg">{project.name}</p>
          <CustomBadge
            tooltip={String(PROJECT_TYPE_NAME?.[project.type] || "")}
          >
            {PROJECT_TYPE_NAME[project.type]}
          </CustomBadge>
          <CustomBadge
            tooltip={String(STATUS_NAME?.[project.status] || "")}
            color={STATUS_COLOR[project.status]}
          >
            {STATUS_NAME[project.status]}
          </CustomBadge>
        </div>
        <article className="w-3/4 text-justify text-sm text-gray-500">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni
          corrupti animi illo qui assumenda eligendi a fugit quod quis odio.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni
          corrupti animi illo qui assumenda eligendi a fugit quod quis odio.
        </article>
      </div>
      <div className="flex items-start justify-between gap-4">
        <Tab
          initial="info"
          tabs={[
            {
              label: "Info",
              value: "info",
              disabled: false,
              component: <ProjectDetailInfo project={project} />,
            },
            {
              label: "Sub Projects",
              value: "sub_project",
              disabled: !project.children.length,
              component: <SubProjects />,
            },
            {
              label: "Equipments",
              value: "equipments",
              disabled: !project.equipment.length,
              component: <ProjectEquipments project={project} />,
            },
          ]}
        />
      </div>
    </div>
  );
};

export default ProjectDetail;
