import ProjectService from "@api/services/project.service";
import { PROJECTS } from "@model/project";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const useProject = () => {
  const { project_id } = useParams();
  const projectDetail = useQuery({
    queryKey: ["project.detail", project_id],
    queryFn: () => ProjectService.detail(project_id || ""),
  });

  return {
    loading: projectDetail.isLoading || projectDetail.isFetching,
    error: projectDetail.error,
    project: projectDetail.data as PROJECTS,
  };
};

export default useProject;
