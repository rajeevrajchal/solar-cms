import VendorService from "@api/services/vendor.service";
import { VENDOR } from "@model/vendor";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

const useVendorMutate = () => {
  const queryClient = useQueryClient();
  const [, setSearchParams] = useSearchParams();

  const create = useMutation({
    mutationFn: (payload: Partial<VENDOR>) => VendorService.create(payload),
    onSuccess: () => {
      setSearchParams({});
      queryClient.refetchQueries({
        queryKey: ["vendors"],
      });
      toast.success("Vendor created successfully");
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to create");
    },
  });

  const update = useMutation({
    mutationFn: (payload: { payload: Partial<VENDOR>; vendor_id: string }) =>
      VendorService.update(payload.payload, payload.vendor_id),
    onSuccess: () => {
      setSearchParams({});
      queryClient.refetchQueries({
        queryKey: ["vendors"],
      });
      toast.success("Vendor created successfully");
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to create");
    },
  });

  return {
    update,
    create,
  };
};

export default useVendorMutate;
