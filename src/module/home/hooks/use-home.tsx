import HomeService from "@api/services/home.service";
import { useQuery } from "@tanstack/react-query";

const useHome = () => {
  const { isLoading, isRefetching, data }: any = useQuery({
    queryKey: ["metric"],
    queryFn: () => HomeService.metric(),
  });

  return { isLoading: isLoading || isRefetching, metric: data?.data };
};

export default useHome;
