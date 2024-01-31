import { LOGIN_TYPE } from "@api/types/auth.type";
import useAxios, { METHOD } from "@plugins/call.axios";

const AuthService = {
  login: (payload: LOGIN_TYPE) =>
    useAxios({
      url: `login`,
      method: METHOD.POST,
      data: payload,
    }),
  logout: () =>
    useAxios({
      url: `logout`,
      method: METHOD.POST,
    }),
  whoIAM: () =>
    useAxios({
      url: `who-i-am`,
      method: METHOD.GET,
    }),
};

export default AuthService;
