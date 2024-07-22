import Menu from "@components/menu";
import ConfirmationModal from "@components/modal/confirmation-modal";
import { STATUS } from "@enum/status.enum";
import { USER_ROLE } from "@enum/user.role";
import useAuth from "@hook/store/use-auth";
import { ActionIcon, Text } from "@mantine/core";
import useProjectMutate from "@module/project/hooks/use-project-mutate";
import AppRoute from "@routes/route.constant";
import { includes } from "lodash";
import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaEye } from "react-icons/fa";
import {
  MdAssignmentInd,
  MdDelete,
  MdEdit,
  MdInsights,
  MdOutlineInstallDesktop,
} from "react-icons/md";
import { VscVmActive } from "react-icons/vsc";
import ProjectAssignMe from "./project-assign-owner";

const map_status_name: any = {
  [STATUS.SITE_SURVEY.toLowerCase()]: {
    key: "insight",
    label: "insight",
  },
  [STATUS.DESIGN_IN_PROGRESS.toLowerCase()]: {
    key: "flow-design",
    label: "flow design",
  },
  [STATUS.EQUIPMENT_SELECTION.toLowerCase()]: {
    key: "equipment",
    label: "equipment",
  },
  [STATUS.NEW.toLowerCase()]: {
    key: "new",
    label: "new",
  },
};

interface ProjectListActionProps {
  project_id: string;
  project_user?: {
    engineer_id: string;
    creator_id: string;
  };
  status: string;
  hideDetail?: boolean;
  hasQuote?: boolean;
}
type MODAL_TYPE =
  | "copy"
  | "assign_me"
  | "assign_engineer"
  | "delete"
  | "installation"
  | "complete"
  | null;

const ProjectListAction = (props: ProjectListActionProps) => {
  const { project_id, project_user, status, hideDetail, hasQuote } = props;
  const { deleteProject, changeProjectStatus } = useProjectMutate();
  const { loginUser } = useAuth();
  const [activeModal, setActiveModal] = useState<MODAL_TYPE>(null);

  const handleMenuClose = () => {
    setActiveModal(null);
  };

  const handleMenuItemClick = (key: MODAL_TYPE) => {
    setActiveModal(key);
  };

  const getMenuViaRole: any = [
    {
      leftSection: <MdEdit size={22} />,
      children: <Text className="capitalize">Edit</Text>,
      component: "a",
      href: AppRoute.project_edit(project_id),
      allow: [USER_ROLE.SALE],
      disable:
        hideDetail ||
        ![STATUS.NEW, STATUS.SITE_SURVEY].includes(
          status.toLowerCase() as STATUS
        ),
    },
    {
      leftSection: <FaEye size={22} />,
      children: <Text className="capitalize">Detail</Text>,
      component: "a",
      href: AppRoute.project_detail(project_id),
      allow: "*",
      disable: hideDetail,
    },
    {
      leftSection: <MdAssignmentInd size={22} />,
      children: <Text className="capitalize">Assign Me</Text>,
      onClick: () => handleMenuItemClick("assign_me"),
      allow: [USER_ROLE.ENGINEER],
      disable: project_user?.engineer_id,
    },
    {
      leftSection: <MdAssignmentInd size={22} />,
      children: <Text className="capitalize">Select Engineer</Text>,
      onClick: () => handleMenuItemClick("assign_engineer"),
      allow: [USER_ROLE.SALE],
      disable: project_user?.engineer_id,
    },
    {
      leftSection: <MdInsights size={22} />,
      children: (
        <Text tt="capitalize">
          {map_status_name[status?.toLowerCase()]?.label}
        </Text>
      ),
      allow: [USER_ROLE.ENGINEER],
      href: AppRoute.project_insight(project_id),
      component: "a",
      disable:
        includes(
          [
            STATUS.CUSTOMER_INQUIRY,
            STATUS.CUSTOMER_READY,
            STATUS.INSTALLATION_IN_PROGRESS,
            STATUS.ONLINE,
          ],
          status.toLowerCase()
        ) || !project_user?.engineer_id,
    },
    {
      leftSection: <MdInsights size={22} />,
      children: <Text tt="capitalize">Create Quote</Text>,
      allow: [USER_ROLE.SALE],
      href: AppRoute.create_quote(project_id),
      component: "a",
      disable:
        hasQuote || !includes([STATUS.CUSTOMER_INQUIRY], status.toLowerCase()),
    },
    {
      leftSection: <MdOutlineInstallDesktop size={22} />,
      children: <Text className="capitalize">Installation Started</Text>,
      onClick: () => handleMenuItemClick("installation"),
      allow: [USER_ROLE.ENGINEER, USER_ROLE.SALE],
      disable: !includes([STATUS.CUSTOMER_READY], status.toLowerCase()),
    },
    {
      leftSection: <VscVmActive color="green" size={22} />,
      children: (
        <Text className="capitalize" c="green">
          Mark Project Online
        </Text>
      ),
      onClick: () => handleMenuItemClick("complete"),
      allow: "*",
      disable: !includes(
        [STATUS.INSTALLATION_IN_PROGRESS],
        status.toLowerCase()
      ),
    },
    {
      leftSection: <MdDelete color="red" size={22} />,
      children: (
        <Text className="capitalize" c="red">
          Delete
        </Text>
      ),
      onClick: () => handleMenuItemClick("delete"),
      allow: [USER_ROLE.SALE, USER_ROLE.ADMIN],
      disable: includes(
        [STATUS.CUSTOMER_READY, STATUS.INSTALLATION_IN_PROGRESS, STATUS.ONLINE],
        status.toLowerCase()
      ),
    },
  ].filter((item) => {
    if (item?.allow === "*" && !item?.disable) {
      return true;
    } else {
      return item?.allow?.includes(
        loginUser?.role?.toLowerCase() as USER_ROLE
      ) && !item?.disable
        ? true
        : false;
    }
  });

  return (
    <>
      <Menu
        trigger={
          <ActionIcon variant="subtle" aria-label="More">
            <BsThreeDotsVertical size={24} />
          </ActionIcon>
        }
        menu={[
          {
            label: "Action",
            items: getMenuViaRole,
          },
        ]}
      />

      {/* delete */}
      <ConfirmationModal
        opened={activeModal === "delete"}
        close={handleMenuClose}
        confirm={() =>
          deleteProject.mutate(project_id, {
            onSuccess: () => {
              handleMenuClose();
            },
          })
        }
        title="Delete Confirmation"
        description="Are you sure you want to delete this project. Deleting this project will also delete respective items like quote."
      />

      {/* installation */}
      <ConfirmationModal
        opened={activeModal === "installation"}
        close={handleMenuClose}
        confirm={() =>
          changeProjectStatus.mutate({
            project_id: project_id,
            status: STATUS.INSTALLATION_IN_PROGRESS,
          })
        }
        title="Start Project Installation Confirmation"
        description="Are you sure project installation started. "
      />

      {/* complete */}
      <ConfirmationModal
        opened={activeModal === "complete"}
        close={handleMenuClose}
        confirm={() =>
          changeProjectStatus.mutate({
            project_id: project_id,
            status: STATUS.ONLINE,
          })
        }
        title="Project Complete Confirmation"
        description="Are you sure, project has been successfully installed and active. "
      />

      {/* assign self */}
      <ConfirmationModal
        opened={activeModal === "assign_me"}
        close={handleMenuClose}
        confirm={() =>
          console.log("values for assign user", {
            project_id: project_id,
            owner_id: loginUser?.id,
            owner_type: loginUser?.role,
          })
        }
        title="Assign Confirmation"
        description="Are you sure you want to assign this project for your self."
      />

      {/* assign new engineer */}
      {activeModal === "assign_engineer" && (
        <ProjectAssignMe
          owner_key="engineer"
          opened={activeModal === "assign_engineer"}
          close={handleMenuClose}
          title="Assign Project"
          project_id={project_id}
        />
      )}
    </>
  );
};

export default ProjectListAction;
