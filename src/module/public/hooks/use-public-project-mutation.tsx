import ProjectService from "@api/services/project.service";
import { ELECTRIC_LOAD } from "@api/types/project-input.type";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const usePublicProjectMutate = () => {
  const uploadELECTRIC_LOAD = useMutation({
    mutationFn: ({
      project_id,
      payload,
    }: {
      project_id: string;
      payload: ELECTRIC_LOAD[];
    }) => ProjectService.store_electric_load(project_id, payload),
    onSuccess: () => {
      toast.success("Project is created.");
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to create");
    },
  });

  return {
    uploadELECTRIC_LOAD,
  };
};

export default usePublicProjectMutate;
