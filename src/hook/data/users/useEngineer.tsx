import UserService from "@api/services/user.service";
import { useQuery } from "@tanstack/react-query";

const useEngineers = () => {
  const userList = useQuery({
    queryKey: ["users.engineers"],
    queryFn: () => UserService.engineers(),
  });

  return {
    loading: userList.isLoading || userList.isFetching,
    users: userList.data || [],
  };
};

export default useEngineers;
