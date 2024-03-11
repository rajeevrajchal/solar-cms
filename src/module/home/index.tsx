import { USER_ROLE } from "@enum/user.role";
import useAuth from "@hook/store/use-auth";
import AdminHome from "./view/admin";
import ClientHome from "./view/client";

const Home = () => {
  const { loginUser } = useAuth();

  const getView = () => {
    switch (loginUser?.role?.toLowerCase() as USER_ROLE) {
      case USER_ROLE.ADMIN:
        return <AdminHome />;
      default:
        return <ClientHome />;
    }
  };

  return getView();
};

export default Home;
