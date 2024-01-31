import { Route, Routes } from "react-router-dom";
import NotFound from "@components/errors/not-found";
import VendorList from "./views/list";

const Vendor = () => {
  return (
    <Routes>
      <Route index element={<VendorList />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Vendor;
