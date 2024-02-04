import InventoryService from "@api/services/inventory.service";
import { INVENTORY } from "@model/inventory";
import AppRoute from "@routes/route.constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const useInventoryMutate = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const create = useMutation({
    mutationFn: (payload: Partial<INVENTORY>) =>
      InventoryService.create(payload),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ["inventories"],
      });
      toast.success("Inventory created successfully");
      navigate(AppRoute.inventory);
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to create");
    },
  });

  const create_as_draft = useMutation({
    mutationFn: (payload: Partial<INVENTORY>) =>
      InventoryService.create_as_draft(payload),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ["inventories"],
      });
      toast.success("Inventory created successfully");
      navigate(AppRoute.inventory);
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to create");
    },
  });

  const update = useMutation({
    mutationFn: (payload: {
      payload: Partial<INVENTORY>;
      inventory_id: string | null;
    }) => InventoryService.update(payload.payload, payload.inventory_id),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ["inventories"],
      });
      toast.success("Inventory deleted successfully");
      navigate(-1);
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to update");
    },
  });

  const delete_inventory = useMutation({
    mutationFn: (inventory_id: string | null) =>
      InventoryService.delete(inventory_id),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ["inventories"],
      });
      toast.success("Inventory deleted successfully");
      navigate(-1);
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to delete");
    },
  });

  const prase_csv = useMutation({
    mutationFn: (payload: { file: any }) => InventoryService.parse_csv(payload),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ["inventories"],
      });
      toast.success("Provided csv read successfully");
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to create");
    },
  });

  const download_csv = useMutation({
    mutationFn: () => InventoryService.download_csv(),
    onSuccess: (data) => {
      console.log("teh data are", data);
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to create");
    },
  });

  return {
    update,
    create,
    create_as_draft,
    prase_csv,
    download_csv,
    delete_inventory,
  };
};

export default useInventoryMutate;
