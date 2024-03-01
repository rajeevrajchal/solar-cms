import useAxios, { METHOD } from "@plugins/call.axios";
import { buildQueryString } from "@utils/functions/build-query-string";

const OrderService = {
  list: (params: { search?: string; status?: string }) =>
    useAxios({
      url: `order${buildQueryString(params)}`,
      method: METHOD.GET,
    }),
  detail: (order_id: string | null | undefined) => {
    if (order_id || order_id !== null || order_id !== undefined) {
      return useAxios({
        url: `order/${order_id}`,
        method: METHOD.GET,
      });
    } else {
      throw new Error("Order Id is required");
    }
  },
  delete: (order_id: string | null | undefined) => {
    if (order_id || order_id !== null || order_id !== undefined) {
      return useAxios({
        url: `order/${order_id}`,
        method: METHOD.DELETE,
      });
    } else {
      throw new Error("Order Id is required");
    }
  },
};

export default OrderService;
