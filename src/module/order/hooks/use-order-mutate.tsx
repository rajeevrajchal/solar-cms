import OrderService from "@api/services/order.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useOrderMutate = () => {
  const queryClient = useQueryClient();

  // const navigate = useNavigate();
  // const createOrder = useMutation({
  //   mutationFn: (payload: Partial<ORDER_INPUT>) => OrderService.create(payload),
  //   onSuccess: (data: any) => {
  //     toast.success("Order is created.");
  //     navigate(AppRoute.order_detail(data?.order?.id));
  //   },
  //   onError: (error) => {
  //     toast.error(error?.message || "Failed to create");
  //   },
  // });

  // const updateOrder = useMutation({
  //   mutationFn: (payload: Partial<ORDER_INPUT>) => OrderService.update(payload),
  //   onSuccess: (data: any) => {
  //     toast.success("Order is created.");
  //     queryClient.invalidateQueries({
  //       queryKey: ["order.detail", data?.order?.id],
  //     });
  //   },
  //   onError: (error) => {
  //     toast.error(error?.message || "Failed to create");
  //   },
  // });

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
  };
};

export default useOrderMutate;
