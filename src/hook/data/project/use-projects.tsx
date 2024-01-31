import ProjectService from "@api/services/project.service";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

const useProjects = () => {
  const [searchParams] = useSearchParams();

  const projectFetch = useQuery({
    queryKey: ["projects", searchParams.get("tab")],
    queryFn: () => ProjectService.list(searchParams.get("tab") || ""),
  });

  return {
    loading: projectFetch.isLoading || projectFetch.isFetching,
    projects: projectFetch.data,
  };
};

export default useProjects;
