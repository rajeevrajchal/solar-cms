import NotFound from "@components/errors/not-found";
import { Route, Routes } from "react-router-dom";
import ServiceList from "./view/service-list";

const Services = () => {
  return (
    <Routes>
      <Route index element={<ServiceList />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Services;
