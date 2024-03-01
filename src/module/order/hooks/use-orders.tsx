import OrderService from "@api/services/order.service";
import { useDebounce } from "@hook/utils/use-debounce";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

const useOrders = () => {
  const [searchParams] = useSearchParams();
  const debouncedValue = useDebounce<string>(
    searchParams.get("search") || "",
    500
  );

  const orders = useQuery({
    queryKey: ["orders", debouncedValue, searchParams.get("status")],
    queryFn: () =>
      OrderService.list({
        search: debouncedValue || "",
        status: searchParams.get("status") || "",
      }),
  });

  return {
    loading: orders.isLoading || orders.isFetching,
    orders: (orders.data as any) || [],
  };
};

export default useOrders;
