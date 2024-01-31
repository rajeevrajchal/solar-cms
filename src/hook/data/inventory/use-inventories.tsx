import InventoryService from "@api/services/inventory.service";
import { useDebounce } from "@hook/utils/use-debounce";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

const useInventories = () => {
  const [searchParams] = useSearchParams();
  const debouncedValue = useDebounce<string>(
    searchParams.get("search") || "",
    500
  );

  const inventories = useQuery({
    queryKey: [
      "inventories",
      searchParams.get("category"),
      debouncedValue,
      searchParams.get("vendor"),
    ],
    queryFn: () =>
      InventoryService.list({
        search: debouncedValue || "",
        category: searchParams.get("category") || "",
        vendor: searchParams.get("vendor") || "",
      }),
  });

  return {
    loading: inventories.isLoading || inventories.isFetching,
    inventories: inventories.data || [],
  };
};

export default useInventories;
