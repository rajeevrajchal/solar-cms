import ProjectService from "@api/services/project.service";
import { PROJECTS } from "@model/project";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const useProjectPublic = () => {
  const { project_id } = useParams();
  const projectDetail = useQuery({
    queryKey: ["project.public_detail", project_id],
    queryFn: () => ProjectService.public_detail(project_id || ""),
  });

  return {
    loading: projectDetail.isLoading || projectDetail.isFetching,
    error: projectDetail.error,
    project: projectDetail.data as PROJECTS,
  };
};

export default useProjectPublic;
