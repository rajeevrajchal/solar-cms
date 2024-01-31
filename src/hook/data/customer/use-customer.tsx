import CustomerService from "@api/services/customer.service";
import { USER } from "@model/user";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const useCustomer = () => {
  const { customer_id } = useParams();

  const customerDetail = useQuery({
    queryKey: ["customer.detail", customer_id],
    queryFn: () => CustomerService.detail(customer_id || ""),
    enabled: !!customer_id,
  });

  return {
    loading: customerDetail.isLoading,
    error: customerDetail.error,
    customer: customerDetail.data
      ? (customerDetail.data as USER)
      : ({} as USER),
  };
};

export default useCustomer;
