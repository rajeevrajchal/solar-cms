import ProjectService from "@api/services/project.service";
import { ASSIGN_OWNER_PROJECT } from "@api/types/project-input.type";
import { PROJECTS } from "@model/project";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useProjectMutate = () => {
  const queryClient = useQueryClient();

  const createProject = useMutation({
    mutationFn: (payload: Partial<PROJECTS>) => ProjectService.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
      queryClient.invalidateQueries({
        queryKey: ["customer.detail"],
      });
      toast.success("Project is created.");
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to create");
    },
  });

  const updateProjectBySale = useMutation({
    mutationFn: (payload: Partial<PROJECTS>) => ProjectService.update(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
      queryClient.invalidateQueries({
        queryKey: ["customer.detail"],
      });
      toast.success("Project is created.");
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to create");
    },
  });

  const deleteProject = useMutation({
    mutationFn: (project_id: string) => ProjectService.delete(project_id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
      queryClient.invalidateQueries({
        queryKey: ["customer.detail"],
      });
      toast.success("Project is deleted successfully");
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to delete");
    },
  });

  const copyProject = useMutation({
    mutationFn: (payload: { project_id: string }) =>
      ProjectService.copy_project(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
      queryClient.invalidateQueries({
        queryKey: ["customer.detail"],
      });
      toast.success("Project is deleted successfully");
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to delete");
    },
  });

  const assignOwnerToProject = useMutation({
    mutationFn: (payload: ASSIGN_OWNER_PROJECT) =>
      ProjectService.assign_owner_to_project(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
      toast.success("Project is assigned successfully");
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to assign project");
    },
  });

  const projectInsight = useMutation({
    mutationFn: (payload: any) => ProjectService.project_insight(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["project.detail"],
      });
      toast.success("Project is insight filled");
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to filled project insight");
    },
  });

  const assignEquipmentInProject = useMutation({
    mutationFn: (payload: any) => ProjectService.project_equipment(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["project.detail"],
      });
      toast.success("Equipment assigned to project");
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to assign project to equipment");
    },
  });

  return {
    createProject,
    updateProjectBySale,
    deleteProject,
    assignOwnerToProject,
    projectInsight,
    copyProject,
    assignEquipmentInProject,
  };
};

export default useProjectMutate;
