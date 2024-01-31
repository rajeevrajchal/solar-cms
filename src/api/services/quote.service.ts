import { QUOTE } from "@model/quote";
import useAxios, { METHOD } from "@plugins/call.axios";
import { buildQueryString } from "@utils/functions/build-query-string";

const QuoteService = {
  list: (params: { search?: string }) =>
    useAxios({
      url: `quote${buildQueryString(params)}`,
      method: METHOD.GET,
    }),
  create: (payload: Partial<QUOTE>) =>
    useAxios({
      url: `quote`,
      method: METHOD.POST,
      data: payload,
    }),
  update: (payload: Partial<QUOTE>, quote_id: string) =>
    useAxios({
      url: `quote/${quote_id}`,
      method: METHOD.PATCH,
      data: payload,
    }),
  detail: (quote_id: string | null) => {
    if (quote_id || quote_id !== null) {
      return useAxios({
        url: `quote/${quote_id}`,
        method: METHOD.GET,
      });
    } else {
      throw new Error("Quote Id is required");
    }
  },
};

export default QuoteService;
