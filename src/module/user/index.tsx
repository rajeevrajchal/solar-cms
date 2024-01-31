import { Routes, Route } from "react-router-dom";
import UserList from "./view/list";
import CreateUser from "./view/create";
import UserDetailLayout from "./layout/user-detail-layout";
import UserCreateForm from "./components/user-create-form";

const User = () => {
  return (
    <Routes>
      <Route index element={<UserList />} />
      <Route path="create" element={<CreateUser />} />
      <Route
        path=":user_id/edit"
        element={
          <UserDetailLayout hasChildren={true}>
            {(user) => <UserCreateForm data={user} />}
          </UserDetailLayout>
        }
      />
      <Route path=":user_id" element={<UserDetailLayout />} />
    </Routes>
  );
};

export default User;
