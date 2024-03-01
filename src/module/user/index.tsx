import { Route, Routes } from "react-router-dom";
import UserDetailLayout from "./layout/user-detail-layout";
import CreateUser from "./view/create";
import UserList from "./view/list";

const User = () => {
  return (
    <Routes>
      <Route index element={<UserList />} />
      <Route path="create" element={<CreateUser />} />
      <Route path=":user_id" element={<UserDetailLayout />} />
    </Routes>
  );
};

export default User;
