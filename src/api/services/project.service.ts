import {
  ASSIGN_OWNER_PROJECT,
  ELECTRIC_LOAD,
} from "@api/types/project-input.type";
import { PROJECTS } from "@model/project";
import useAxios, { METHOD } from "@plugins/call.axios";

const ProjectService = {
  list: (query?: string) => {
    return useAxios({
      url: !query || query === "my" ? `project` : `project?type=${query}`,
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
};

export default ProjectService;
