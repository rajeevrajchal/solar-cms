import CustomerService from "@api/services/customer.service";
import { useDebounce } from "@hook/utils/use-debounce";
import { USER } from "@model/user";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

const useCustomers = () => {
  const [searchParams] = useSearchParams();
  const debouncedValue = useDebounce<string>(
    searchParams.get("search") || "",
    500
  );
  const customerList = useQuery({
    queryKey: ["customers", debouncedValue],
    queryFn: () =>
      CustomerService.list({
        search: debouncedValue,
      }),
  });

  return {
    loading: customerList.isLoading || customerList.isFetching,
    customers: (customerList.data as USER[]) || [],
  };
};

export default useCustomers;
