import UserService from "@api/services/user.service";
import { useQuery } from "@tanstack/react-query";

const useUsers = () => {
  const userList = useQuery({
    queryKey: ["users"],
    queryFn: () => UserService.list(),
  });

  return {
    loading: userList.isLoading || userList.isFetching,
    users: userList.data || [],
  };
};

export default useUsers;
