import VendorService from "@api/services/vendor.service";
import { useDebounce } from "@hook/utils/use-debounce";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

const useVendors = () => {
  const [searchParams] = useSearchParams();
  const debouncedValue = useDebounce<string>(
    searchParams.get("search") || "",
    500
  );
  const vendors = useQuery({
    queryKey: ["vendors", debouncedValue],
    queryFn: () =>
      VendorService.list({
        search: debouncedValue,
      }),
  });

  return {
    loading: vendors.isLoading || vendors.isFetching,
    vendors: vendors.data || [],
  };
};

export default useVendors;
