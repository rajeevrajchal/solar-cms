import useAxios, { METHOD } from "@plugins/call.axios";
import { buildQueryString } from "@utils/functions/build-query-string";
import { omit } from "lodash";

export type QUOTE_INPUT = {
  project_id: string;
  discount?: number;
  adjustment?: number;
  installation_cost: number;
  quote_id?: string;
};

const QuoteService = {
  list: (params: { search?: string; status?: string }) =>
    useAxios({
      url: `quote${buildQueryString(params)}`,
      method: METHOD.GET,
    }),
  create: (payload: Partial<QUOTE_INPUT>) =>
    useAxios({
      url: `quote`,
      method: METHOD.POST,
      data: omit(payload, ["quote_id"]),
    }),
  update: (payload: Partial<QUOTE_INPUT>) =>
    useAxios({
      url: `quote/${payload.quote_id}`,
      method: METHOD.PATCH,
      data: omit(payload, ["quote_id"]),
    }),
  detail: (quote_id: string | null | undefined) => {
    if (quote_id || quote_id !== null || quote_id !== undefined) {
      return useAxios({
        url: `quote/${quote_id}`,
        method: METHOD.GET,
      });
    } else {
      throw new Error("Quote Id is required");
    }
  },
  delete: (quote_id: string | null | undefined) => {
    if (quote_id || quote_id !== null || quote_id !== undefined) {
      return useAxios({
        url: `quote/${quote_id}`,
        method: METHOD.DELETE,
      });
    } else {
      throw new Error("Quote Id is required");
    }
  },
  approve: (quote_id: string | null | undefined) => {
    if (quote_id || quote_id !== null || quote_id !== undefined) {
      return useAxios({
        url: `quote/approve/${quote_id}`,
        method: METHOD.PATCH,
      });
    } else {
      throw new Error("Quote Id is required");
    }
  },
  reject: (quote_id: string | null | undefined) => {
    if (quote_id || quote_id !== null || quote_id !== undefined) {
      return useAxios({
        url: `quote/reject/${quote_id}`,
        method: METHOD.PATCH,
      });
    } else {
      throw new Error("Quote Id is required");
    }
  },
  download: (quote_id: string | null | undefined) => {
    if (quote_id || quote_id !== null || quote_id !== undefined) {
      return useAxios({
        url: `quote/download/${quote_id}`,
        method: METHOD.POST,
        isDownload: true,
        responseType: "blob",
      });
    } else {
      throw new Error("Quote Id is required");
    }
  },
};

export default QuoteService;
