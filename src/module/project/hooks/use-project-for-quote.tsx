import ProjectService from "@api/services/project.service";
import { useQuery } from "@tanstack/react-query";

const useProjectForQuote = (props: { skip?: boolean }) => {
  const { skip } = props;
  const projects = useQuery({
    queryKey: ["projects.quote"],
    queryFn: () => ProjectService.remain_for_quote(),
    enabled: !skip,
  });

  return {
    loading: projects.isLoading || projects.isFetching,
    projects: projects.data,
  };
};

export default useProjectForQuote;
