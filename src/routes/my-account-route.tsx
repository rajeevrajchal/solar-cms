import UserCreateForm from "@module/user/components/user-create-form";
import UserDetailLayout from "@module/user/layout/user-detail-layout";
import { Route, Routes } from "react-router-dom";

const MyAccountRoute = () => {
  return (
    <Routes>
      <Route index element={<UserDetailLayout />} />
      <Route
        path="edit"
        element={
          <UserDetailLayout hasChildren={true}>
            {(user) => <UserCreateForm data={user} />}
          </UserDetailLayout>
        }
      />
    </Routes>
  );
};

export default MyAccountRoute;
