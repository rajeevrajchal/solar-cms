import useAxios, { METHOD } from "@plugins/call.axios";
import { buildQueryString } from "@utils/functions/build-query-string";

const serviceAPI = "service";

const ServiceService = {
  system: (params: { search?: string }) =>
    useAxios({
      url: `${serviceAPI}${buildQueryString(params)}`,
      method: METHOD.GET,
    }),
  "service-configuration": () =>
    useAxios({
      url: `${serviceAPI}/customer-configuration`,
      method: METHOD.GET,
    }),
};

export default ServiceService;
