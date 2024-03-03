import OrderService, {
  ORDER_INPUT,
  ORDER_STATUS_CHANGE,
} from "@api/services/order.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useOrderMutate = () => {
  const queryClient = useQueryClient();

  const orderStatusChange = useMutation({
    mutationFn: (payload: ORDER_STATUS_CHANGE) =>
      OrderService.change_status(payload),
    onSuccess: () => {
      toast.success("Order status changed.");
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to create");
    },
  });

  const updateOrder = useMutation({
    mutationFn: (payload: ORDER_INPUT) => OrderService.update(payload),
    onSuccess: () => {
      toast.success("Order is updated.");
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to create");
    },
  });

  const deleteOrder = useMutation({
    mutationFn: (order_id: string | undefined) => OrderService.delete(order_id),
    onSuccess: () => {
      toast.success("Order is deleted.");
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to delete");
    },
  });

  return {
    deleteOrder,
    updateOrder,
    orderStatusChange,
  };
};

export default useOrderMutate;
