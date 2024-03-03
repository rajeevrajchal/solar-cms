import useAxios, { METHOD } from "@plugins/call.axios";
import { buildQueryString } from "@utils/functions/build-query-string";
import { omit } from "lodash";

export type ORDER_INPUT = {
  payment: number;
  full_payment: boolean;
  order_id: string;
};

export type ORDER_STATUS_CHANGE = {
  reason: string;
  order_id: string;
  status_type: "on_hold" | "canaled" | "ordered" | "payment_done" | "pending";
};

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
  update: (payload: ORDER_INPUT) => {
    if (payload.order_id) {
      return useAxios({
        url: `order/${payload.order_id}`,
        method: METHOD.PATCH,
        data: omit(payload, ["order_id"]),
      });
    } else {
      throw new Error("Order Id is required");
    }
  },
  change_status: (payload: ORDER_STATUS_CHANGE) => {
    if (payload.order_id) {
      return useAxios({
        url: `order/change-status/${payload.order_id}/${payload.status_type}`,
        method: METHOD.PATCH,
        data: omit(payload, ["order_id", "status_type"]),
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
