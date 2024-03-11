import { Route, Routes } from "react-router-dom";
import UserCreateForm from "./components/user-create-form";
import UserDetailLayout from "./layout/user-detail-layout";
import CreateUser from "./view/create";
import UserList from "./view/list";

const User = () => {
  return (
    <Routes>
      <Route index element={<UserList />} />
      <Route path="create" element={<CreateUser />} />
      <Route path=":user_id" element={<UserDetailLayout />} />
      <Route
        path=":user_id/edit"
        element={
          <UserDetailLayout hasChildren={true}>
            {(user) => <UserCreateForm data={user} />}
          </UserDetailLayout>
        }
      />
    </Routes>
  );
};

export default User;
