import {
  ASSIGN_OWNER_PROJECT,
  ELECTRIC_LOAD,
} from "@api/types/project-input.type";
import { STATUS } from "@enum/status.enum";
import { PROJECTS } from "@model/project";
import useAxios, { METHOD } from "@plugins/call.axios";
import { buildQueryString } from "@utils/functions/build-query-string";

export type CHANGE_STATUS = {
  project_id: string;
  status: STATUS;
};

const ProjectService = {
  list: (params: { search?: string; status?: string; tab?: string }) => {
    return useAxios({
      url: `project${buildQueryString(params)}`,
      method: METHOD.GET,
    });
  },
  remain_for_quote: () => {
    return useAxios({
      url: `project/remain-for-quote`,
      method: METHOD.GET,
    });
  },
  create: (payload: Partial<PROJECTS>) =>
    useAxios({
      url: `project`,
      method: METHOD.POST,
      data: payload,
    }),

  update: (payload: Partial<PROJECTS>) =>
    useAxios({
      url: `project/${payload.id}`,
      method: METHOD.PATCH,
      data: payload,
    }),

  detail: (project_id: string) => {
    if (!project_id) {
      throw new Error("No project found");
    } else {
      return useAxios({
        url: `project/${project_id}`,
        method: METHOD.GET,
      });
    }
  },

  public_detail: (project_id: string) => {
    if (!project_id) {
      throw new Error("No project found");
    } else {
      return useAxios({
        url: `project/public/${project_id}`,
        method: METHOD.GET,
      });
    }
  },

  store_electric_load: (project_id: string, payload: ELECTRIC_LOAD[]) => {
    if (!project_id) {
      throw new Error("No project found");
    } else {
      return useAxios({
        url: `project/public/${project_id}/electric-load`,
        method: METHOD.POST,
        data: payload,
      });
    }
  },

  assign_owner_to_project: (payload: ASSIGN_OWNER_PROJECT) =>
    useAxios({
      url: `project/${payload.project_id}/update-user`,
      method: METHOD.PATCH,
      data: payload,
    }),

  project_insight: (payload: any) =>
    useAxios({
      url: `project/${payload.id}/insight`,
      method: METHOD.PATCH,
      data: payload,
    }),

  project_equipment: (payload: any) =>
    useAxios({
      url: `project/${payload.id}/equipment`,
      method: METHOD.PATCH,
      data: payload,
    }),

  project_model: (payload: any) =>
    useAxios({
      url: `project/${payload.id}/project-model`,
      method: METHOD.PATCH,
      data: payload,
      contentType: "multipart/form-data",
    }),

  copy_project: (payload: { project_id: string }) => {
    if (!payload?.project_id) {
      throw new Error("No project found");
    } else {
      return useAxios({
        url: `project/copy/${payload?.project_id}`,
        method: METHOD.PATCH,
        data: payload,
      });
    }
  },

  project_request_load: (payload: { project_id: string }) => {
    if (!payload?.project_id) {
      throw new Error("No project found");
    } else {
      return useAxios({
        url: `project/${payload?.project_id}/request-load`,
        method: METHOD.POST,
        data: payload,
      });
    }
  },

  delete: (project_id: string) => {
    if (!project_id) {
      throw new Error("No project found");
    } else {
      return useAxios({
        url: `project/${project_id}`,
        method: METHOD.DELETE,
      });
    }
  },

  change_status: (payload: CHANGE_STATUS) =>
    useAxios({
      url: `project/change-status/${payload.project_id}`,
      method: METHOD.PATCH,
      data: {
        status: payload.status,
      },
    }),
};

export default ProjectService;
