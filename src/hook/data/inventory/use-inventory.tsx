import InventoryService from "@api/services/inventory.service";
import { INVENTORY } from "@model/inventory";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const useInventory = () => {
  const { inventory_id } = useParams();

  const inventory = useQuery({
    queryKey: ["inventory.detail", inventory_id],
    queryFn: () => InventoryService.detail(inventory_id || null),
    enabled: inventory_id !== undefined,
  });

  return {
    loading: inventory.isLoading || inventory.isFetching,
    error: inventory.error,
    inventory: inventory.data as INVENTORY,
  };
};

export default useInventory;
