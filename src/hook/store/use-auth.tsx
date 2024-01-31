import {
  ReactElement,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";
import { USER } from "@model/user";
import useLocalStorage from "@hook/utils/use-localstorage";
import {
  user_info_key,
  user_refresh_token_key,
  user_token_key,
} from "@constant/ls-key";
import { useMutation } from "@tanstack/react-query";
import AuthService from "@api/services/auth.service";
import { LOGIN_TYPE } from "@api/types/auth.type";

interface UseAuthProps {
  isLoggedIn: boolean;
  loading: boolean;
  loginUser: USER;

  login: {
    mutate: (payload: LOGIN_TYPE) => void;
    isPending: boolean;
  };
  logout: {
    mutate: () => void;
    isPending: boolean;
  };
}

const authContext = createContext<UseAuthProps>({} as UseAuthProps);
const { Provider } = authContext;

const useAuthData = () => {
  const { setStorageData, getStorageData, removeStorageData } =
    useLocalStorage();

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [loginUser, setLoginUser] = useState<USER>({} as USER);

  const clearSession = async () => {
    setIsLoggedIn(false);
    setLoginUser({} as USER);
    await removeStorageData(user_token_key);
    await removeStorageData(user_refresh_token_key);
  };

  const login = useMutation({
    mutationFn: (payload: LOGIN_TYPE) => AuthService.login(payload),
    onSuccess: async (data: any) => {
      await setStorageData(user_token_key, data?.access_token);
      await setStorageData(user_refresh_token_key, data?.refresh_token);
      await setStorageData(user_info_key, data?.user);

      setIsLoggedIn(true);
      setLoginUser(data?.user);
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to login");
    },
  });

  const logout = useMutation({
    mutationFn: () => AuthService.logout(),
    onSuccess: async () => {
      await removeStorageData(user_token_key);
      await removeStorageData(user_refresh_token_key);

      setLoginUser({} as USER);
      setIsLoggedIn(false);
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to logout");
    },
  });

  const whoIAM = useMutation({
    mutationFn: () => AuthService.whoIAM(),
    onSuccess: (data: any) => {
      setIsLoggedIn(true);
      setLoginUser(data?.whoAmI);
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to login");
      clearSession();
    },
  });

  const checkAuthentication = async () => {
    const tokenFromLS = await getStorageData(user_token_key);
    const userFromLS = await getStorageData(user_info_key);
    if (tokenFromLS && userFromLS) {
      setIsLoggedIn(true);
      setLoginUser(userFromLS);
    } else {
      setIsLoggedIn(false);
      setLoginUser({} as USER);
    }
  };

  useEffect(() => {
    checkAuthentication();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    loading: whoIAM.isPending,
    isLoggedIn,
    loginUser,

    login: login,
    logout: logout,
  };
};

export function AuthProvider({ children }: { children: ReactElement }) {
  const data = useAuthData();
  return <Provider value={data}>{children}</Provider>;
}

const useAuth = () => useContext(authContext);

export default useAuth;
