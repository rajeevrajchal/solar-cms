import { INVENTORY } from "@model/inventory";
import useAxios, { METHOD } from "@plugins/call.axios";
import { buildQueryString } from "@utils/functions/build-query-string";

const InventoryService = {
  list: (params: { search?: string; vendor?: string; category?: string }) =>
    useAxios({
      url: `inventory${buildQueryString(params)}`,
      method: METHOD.GET,
    }),

  create: (payload: Partial<INVENTORY>) =>
    useAxios({
      url: `inventory`,
      method: METHOD.POST,
      contentType: "multipart/form-data",
      data: payload,
    }),

  create_as_draft: (payload: Partial<INVENTORY>) =>
    useAxios({
      url: `inventory/as-draft`,
      method: METHOD.POST,
      contentType: "multipart/form-data",
      data: payload,
    }),

  update: (payload: Partial<INVENTORY>, inventory_id: string | null) => {
    if (inventory_id || inventory_id !== null) {
      return useAxios({
        url: `inventory/${inventory_id}`,
        contentType: "multipart/form-data",
        method: METHOD.PATCH,
        data: payload,
      });
    } else {
      throw new Error("Inventory Id is required");
    }
  },

  delete: (inventory_id: string | null) => {
    if (inventory_id || inventory_id !== null) {
      return useAxios({
        url: `inventory/${inventory_id}`,
        method: METHOD.DELETE,
      });
    } else {
      throw new Error("Inventory Id is required");
    }
  },

  detail: (inventory_id: string | null) => {
    if (inventory_id || inventory_id !== null) {
      return useAxios({
        url: `inventory/${inventory_id}`,
        method: METHOD.GET,
      });
    } else {
      throw new Error("Inventory Id is required");
    }
  },
  parse_csv: (payload: { file: any }) =>
    useAxios({
      url: `inventory/parse-csv`,
      method: METHOD.POST,
      data: payload,
      contentType: "multipart/form-data",
    }),

  download_csv: () =>
    useAxios({
      url: `inventory/download-csv`,
      method: METHOD.GET,
      isDownload: true,
      responseType: "blob",
    }),
};

export default InventoryService;
