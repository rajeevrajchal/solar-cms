import { VENDOR } from "@model/vendor";
import useAxios, { METHOD } from "@plugins/call.axios";
import { buildQueryString } from "@utils/functions/build-query-string";

const VendorService = {
  list: (params: { search?: string }) =>
    useAxios({
      url: `vendor${buildQueryString(params)}`,
      method: METHOD.GET,
    }),
  create: (payload: Partial<VENDOR>) =>
    useAxios({
      url: `vendor`,
      method: METHOD.POST,
      data: payload,
    }),
  update: (payload: Partial<VENDOR>, vendor_id: string) =>
    useAxios({
      url: `vendor/${vendor_id}`,
      method: METHOD.PATCH,
      data: payload,
    }),
  detail: (vendor_id: string | null) => {
    if (vendor_id || vendor_id !== null) {
      return useAxios({
        url: `vendor/${vendor_id}`,
        method: METHOD.GET,
      });
    } else {
      throw new Error("Vendor Id is required");
    }
  },
};

export default VendorService;
