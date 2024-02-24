import NotFound from "@components/errors/not-found";
import { Route, Routes } from "react-router-dom";
import OrderList from "./view/order-list";

const Order = () => {
  return (
    <Routes>
      <Route index element={<OrderList />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Order;
