import OrderService from "@api/services/order.service";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const useOrder = () => {
  const { order_id } = useParams();
  const order = useQuery({
    queryKey: ["order.detail", order_id],
    queryFn: () => OrderService.detail(order_id),
  });

  return {
    loading: order.isLoading || order.isFetching,
    order: order.data || [],
    ...order,
  };
};

export default useOrder;
