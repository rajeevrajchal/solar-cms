import ConfirmationModal from "@components/modal/confirmation-modal";
import Menu from "@components/menu";
import AppRoute from "@routes/route.constant";
import { ActionIcon, Text } from "@mantine/core";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaEye } from "react-icons/fa";
import { MdEdit, MdDelete, MdAssignmentInd, MdInsights } from "react-icons/md";
import useProjectMutate from "@hook/data/project/use-project-mutate";
import ProjectAssignMe from "./project-assign-owner";
import { USER_ROLE } from "@enum/user.role";
import useAuth from "@hook/store/use-auth";
import { STATUS } from "@enum/status.enum";
import { includes } from "lodash";
import { useState } from "react";

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
type MODAL_TYPE = "copy" | "assign_me" | "assign_engineer" | "delete" | null;

const ProjectListAction = (props: ProjectListActionProps) => {
  const { project_id, project_user, status, hideDetail, hasQuote } = props;
  const { deleteProject, assignOwnerToProject } = useProjectMutate();
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
      leftSection: <MdEdit />,
      children: <Text className="capitalize">Edit</Text>,
      component: "a",
      href: AppRoute.project_edit(project_id),
      allow: [USER_ROLE.SALE],
      disable: hideDetail,
    },
    {
      leftSection: <FaEye />,
      children: <Text className="capitalize">Detail</Text>,
      component: "a",
      href: AppRoute.project_detail(project_id),
      allow: "*",
      disable: hideDetail,
    },
    {
      leftSection: <MdAssignmentInd />,
      children: <Text className="capitalize">Assign Me</Text>,
      onClick: () => handleMenuItemClick("assign_me"),
      allow: [USER_ROLE.ENGINEER],
      disable: project_user?.engineer_id,
    },
    {
      leftSection: <MdAssignmentInd />,
      children: <Text className="capitalize">Select Engineer</Text>,
      onClick: () => handleMenuItemClick("assign_engineer"),
      allow: [USER_ROLE.SALE],
      disable: project_user?.engineer_id,
    },
    {
      leftSection: <MdInsights />,
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
      leftSection: <MdInsights />,
      children: <Text tt="capitalize">Create Quote</Text>,
      allow: [USER_ROLE.SALE],
      href: AppRoute.create_quote(project_id),
      component: "a",
      disable:
        hasQuote || !includes([STATUS.CUSTOMER_INQUIRY], status.toLowerCase()),
    },
    {
      leftSection: <MdDelete color="red" />,
      children: (
        <Text className="capitalize" c="red">
          Delete
        </Text>
      ),
      onClick: () => handleMenuItemClick("delete"),
      allow: [USER_ROLE.SALE, USER_ROLE.ADMIN],
      disable: false,
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

      {/* assign self */}
      <ConfirmationModal
        opened={activeModal === "assign_me"}
        close={handleMenuClose}
        confirm={() =>
          assignOwnerToProject.mutate(
            {
              project_id: project_id,
              owner_id: loginUser?.id,
              owner_type: loginUser?.role,
            },
            {
              onSuccess: () => {
                handleMenuClose();
              },
            }
          )
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
