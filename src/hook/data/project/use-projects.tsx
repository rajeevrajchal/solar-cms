import ProjectService from "@api/services/project.service";
import { useDebounce } from "@hook/utils/use-debounce";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

const useProjects = () => {
  const [searchParams] = useSearchParams();

  const debouncedValue = useDebounce<string>(
    searchParams.get("search") || "",
    500
  );

  const projectFetch = useQuery({
    queryKey: [
      "projects",
      debouncedValue,
      searchParams.get("tab"),
      searchParams.get("status"),
    ],
    queryFn: () =>
      ProjectService.list({
        tab: searchParams.get("tab") || "",
        search: debouncedValue || "",
        status: searchParams.get("status") || "",
      }),
  });

  return {
    loading: projectFetch.isLoading || projectFetch.isFetching,
    projects: projectFetch.data,
  };
};

export default useProjects;
