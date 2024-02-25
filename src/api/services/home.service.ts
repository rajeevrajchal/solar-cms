import useAxios, { METHOD } from "@plugins/call.axios";

const HomeService = {
  metric: () =>
    useAxios({
      url: `home`,
      method: METHOD.GET,
    }),
};

export default HomeService;
