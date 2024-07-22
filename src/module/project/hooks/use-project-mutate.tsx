import ProjectService, { CHANGE_STATUS } from "@api/services/project.service";
import AppRoute from "@routes/route.constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CREATE_PROJECT } from "@type/mutate/project-mutate";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const useProjectMutate = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const createProject = useMutation({
    mutationFn: (payload: Partial<CREATE_PROJECT>) =>
      ProjectService.create(payload),
    onSuccess: () => {
      navigate(AppRoute.projects);
      toast.success("Project is created.");
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to create");
    },
  });

  const changeProjectStatus = useMutation({
    mutationFn: (payload: CHANGE_STATUS) =>
      ProjectService.change_status(payload),
    onSuccess: () => {
      toast.success("Project status changed.");
      queryClient.invalidateQueries({
        queryKey: ["project.detail"],
      });
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
      toast.success("Project is status changed successfully");
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to change status");
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

  const uploadProjectModel = useMutation({
    mutationFn: (payload: any) => {
      return ProjectService.project_model(payload);
    },
    onSuccess: () => {
      navigate(AppRoute.projects);
      toast.success("Model uploaded to project successfully");
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to upload model");
    },
  });

  const requestFillProjectLoad = useMutation({
    mutationFn: (payload: any) => {
      return ProjectService.project_request_load(payload);
    },
    onSuccess: () => {
      toast.success("Project load linked sent");
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to sent link");
    },
  });

  return {
    createProject,
    deleteProject,
    assignEquipmentInProject,
    uploadProjectModel,
    requestFillProjectLoad,
    changeProjectStatus,
  };
};

export default useProjectMutate;
