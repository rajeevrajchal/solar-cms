import CustomerService from "@api/services/customer.service";
import { USER } from "@model/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useCustomerMutate = () => {
  const queryClient = useQueryClient();

  const createCustomer = useMutation({
    mutationFn: (payload: Partial<USER>) => CustomerService.create(payload),
    onError: (error) => {
      toast.error(error?.message || "Failed to create");
    },
  });

  const deleteCustomer = useMutation({
    mutationFn: (customer_id: string) => CustomerService.delete(customer_id),
    onSuccess: () => {
      toast.success("Customer is deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["customers"],
      });
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to delete");
    },
  });

  return {
    createCustomer,
    deleteCustomer,
  };
};

export default useCustomerMutate;
