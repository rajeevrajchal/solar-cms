import ServiceService from "@api/services/service.service";
import { useQuery } from "@tanstack/react-query";
import { $FIX_ME } from "@type/fix-me";
import { useSearchParams } from "react-router-dom";

const useServiceConfiguration = () => {
  const [searchParams] = useSearchParams();

  const { isLoading, data }: $FIX_ME = useQuery({
    queryKey: ["service", searchParams.get("tab")],
    queryFn: ServiceService["service-configuration"],
  });

  return {
    isLoading,
    service_configuration: data?.data || [],
  };
};

export default useServiceConfiguration;
