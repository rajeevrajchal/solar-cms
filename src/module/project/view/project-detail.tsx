import Tab from "@components/tab";
import { STATUS } from "@enum/status.enum";
import { USER_ROLE } from "@enum/user.role";
import useAuth from "@hook/store/use-auth";
import { Center, Loader, Stack, Text } from "@mantine/core";
import useProject from "@module/project/hooks/use-project";
import { includes } from "lodash";
import { IoMdSettings } from "react-icons/io";
import { IoReceiptOutline } from "react-icons/io5";
import { LuComponent } from "react-icons/lu";
import { MdOutlineElectricBolt } from "react-icons/md";
import ProjectCustomerELECTRIC_LOAD from "../components/detail/project-customer-electric-load";
import ProjectEquipment from "../components/detail/project-equipments";
import ProjectHeader from "../components/detail/project-header";
import ProjectInfoDetail from "../components/detail/project-info-detail";
import ProjectModel from "../components/detail/project-model";
import ProjectQuote from "../components/detail/project-quote";

const ProjectDetail = () => {
  const { loginUser } = useAuth();
  const { loading, error, project } = useProject();

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

  return (
    <Stack gap="sm">
      <ProjectHeader project={project} />
      <Tab
        tabs={[
          {
            label: "Setup",
            icon: <IoMdSettings />,
            value: "setup",
            component: <ProjectInfoDetail project={project} />,
          },
          {
            label: "Load Description",
            icon: <MdOutlineElectricBolt />,
            value: "customer-load",
            component: (
              <ProjectCustomerELECTRIC_LOAD
                electric_load={project?.electric_load ?? []}
                customer={project?.customer ?? {}}
                project_id={project?.id}
                status={project?.status}
              />
            ),
          },
          {
            label: "Model (Design)",
            icon: <LuComponent />,
            value: "model",
            disabled:
              USER_ROLE.ENGINEER !== loginUser.role.toLowerCase() ||
              project.model.length <= 0 ||
              includes(
                [STATUS.NEW, STATUS.SITE_SURVEY, STATUS.EQUIPMENT_SELECTION],
                project?.status?.toLowerCase()
              ),
            component: <ProjectModel models={project.model} />,
          },
          {
            label: "Equipment",
            icon: <LuComponent />,
            value: "equipment",
            component: <ProjectEquipment equipment={project.equipment} />,
          },
          {
            label: "Quote",
            icon: <IoReceiptOutline />,
            value: "quote",
            disabled:
              includes(
                [STATUS.NEW, STATUS.SITE_SURVEY, STATUS.EQUIPMENT_SELECTION],
                project?.status?.toLowerCase()
              ) || loginUser.role.toLowerCase() !== USER_ROLE.SALE,
            component: (
              <ProjectQuote
                project_id={project.id}
                quote={
                  project?.quote?.length > 0
                    ? {
                        ...project.quote[0],
                        project: project,
                      }
                    : null
                }
              />
            ),
          },
        ]}
        initial="setup"
      />
    </Stack>
  );
};

export default ProjectDetail;
