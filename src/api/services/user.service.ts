import { USER } from "@model/user";
import useAxios, { METHOD } from "@plugins/call.axios";

const UserService = {
  list: () =>
    useAxios({
      url: `user`,
      method: METHOD.GET,
    }),
  create: (payload: Partial<USER>) =>
    useAxios({
      url: `user`,
      method: METHOD.POST,
      data: payload,
    }),
  update: (payload: Partial<USER>, user_id: string) =>
    useAxios({
      url: `user/${user_id}`,
      method: METHOD.PATCH,
      data: payload,
    }),
  detail: (user_id?: string) => {
    if (!user_id) {
      throw new Error("No user found");
    } else {
      return useAxios({
        url: `user/${user_id}`,
        method: METHOD.GET,
      });
    }
  },

  delete: (user_id: string) => {
    if (!user_id) {
      throw new Error("No user found");
    } else {
      return useAxios({
        url: `user/${user_id}`,
        method: METHOD.DELETE,
      });
    }
  },
  engineers: () =>
    useAxios({
      url: `user/engineer`,
      method: METHOD.GET,
    }),
  toggle_user: (user_id: string) =>
    useAxios({
      url: `user/toggle-status/${user_id}`,
      method: METHOD.PATCH,
    }),
};

export default UserService;
