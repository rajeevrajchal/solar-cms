import { Route, Routes } from "react-router-dom";
import InventoryList from "./views/list-mode";
import NotFound from "@components/errors/not-found";
import InventoryCreate from "./views/invetory-create";
import InventoryEdit from "./views/inventory-edit";
import InventoryDetail from "./views/inventory-detail";

const Inventory = () => {
  return (
    <Routes>
      <Route index element={<InventoryList />} />
      <Route path="add" element={<InventoryCreate />} />
      <Route path=":inventory_id/edit" element={<InventoryEdit />} />
      <Route path=":inventory_id" element={<InventoryDetail />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Inventory;
