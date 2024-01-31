import UserService from "@api/services/user.service";
import { USER } from "@model/user";
import AppRoute from "@routes/route.constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const useUserMutate = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const create = useMutation({
    mutationFn: (payload: Partial<USER>) => UserService.create(payload),
    onSuccess: () => {
      navigate(AppRoute.users);
      toast.success("User created successfully");
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to create");
    },
  });

  const update = useMutation({
    mutationFn: (payload: { payload: Partial<USER>; user_id: string }) =>
      UserService.update(payload.payload, payload.user_id),
    onSuccess: () => {
      navigate(AppRoute.users);
      toast.success("User created successfully");
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to create");
    },
  });

  const toggleUser = useMutation({
    mutationFn: (user_id: string) => UserService.toggle_user(user_id),
    onSuccess: () => {
      toast.success("User status changed");
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to create");
    },
  });

  const deleteUser = useMutation({
    mutationFn: (user_id: string) => UserService.delete(user_id),
    onSuccess: () => {
      toast.success("Customer is deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to delete");
    },
  });

  return {
    create,
    update,
    deleteUser,
    toggleUser,
  };
};

export default useUserMutate;
