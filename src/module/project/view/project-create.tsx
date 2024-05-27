import { USER_ROLE } from "@enum/user.role";
import useAuth from "@hook/store/use-auth";
import ProjectForm from "../components/create-form";

const ProjectCreate = () => {
  const {
    loginUser: { role },
  } = useAuth();

  return (
    <ProjectForm hideCustomer={role?.toLowerCase() === USER_ROLE.ENGINEER} />
  );
};

export default ProjectCreate;
