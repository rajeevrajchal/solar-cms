import { Route, Routes } from "react-router-dom";
import CustomerList from "./view/customer-list";
import CustomerCreate from "./view/customer-create";
import CustomerEdit from "./view/customer-edit";
import CustomerDetail from "./view/customer-detail";

const Customer = () => {
  return (
    <Routes>
      <Route index element={<CustomerList />} />
      <Route path="create" element={<CustomerCreate />} />
      <Route path="edit/:customer_id" element={<CustomerEdit />} />
      <Route path=":customer_id" element={<CustomerDetail />} />
    </Routes>
  );
};

export default Customer;
