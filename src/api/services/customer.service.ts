import { USER } from "@model/user";
import useAxios, { METHOD } from "@plugins/call.axios";
import { buildQueryString } from "@utils/functions/build-query-string";

const CustomerService = {
  list: (params: { search?: string }) =>
    useAxios({
      url: `customer${buildQueryString(params)}`,
      method: METHOD.GET,
    }),
  create: (payload: Partial<USER>) =>
    useAxios({
      url: `customer`,
      method: METHOD.POST,
      data: payload,
    }),
  detail: (customer_id: string) => {
    if (!customer_id) {
      throw new Error("No customer found");
    } else {
      return useAxios({
        url: `customer/${customer_id}`,
        method: METHOD.GET,
      });
    }
  },
  delete: (customer_id: string) => {
    if (!customer_id) {
      throw new Error("No customer found");
    } else {
      return useAxios({
        url: `customer/${customer_id}`,
        method: METHOD.DELETE,
      });
    }
  },
};

export default CustomerService;
