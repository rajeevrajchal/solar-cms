import VendorService from "@api/services/vendor.service";
import { VENDOR } from "@model/vendor";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

const useVendor = () => {
  const [searchParams] = useSearchParams();

  const vendor = useQuery({
    queryKey: ["vendor.detail", searchParams.get("v_id")],
    queryFn: () => VendorService.detail(searchParams.get("v_id")),
    enabled: searchParams.get("v_id") !== null,
  });

  return {
    loading: vendor.isLoading || vendor.isFetching,
    error: vendor.error,
    vendor: vendor.data as VENDOR,
  };
};

export default useVendor;
