import { toast } from "react-toastify";

const useLocalStorage = () => {
  const setStorageData = async (key: string, value: unknown) => {
    try {
      const jsonValue = JSON.stringify(value);
      await localStorage.setItem(key, jsonValue);
    } catch (e) {
      toast.error("Failed to store data");
    }
  };

  const getStorageData = async (key: string) => {
    try {
      const jsonValue = await localStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      toast.error("Failed to retrieve data");
    }
  };

  const removeStorageData = async (key: string) => {
    try {
      await localStorage.removeItem(key);
      return;
    } catch (e) {
      toast.error("Failed to retrieve data");
    }
  };

  const clearStorage = async () => {
    return localStorage.clear();
  };

  return {
    setStorageData,
    getStorageData,
    clearStorage,
    removeStorageData,
  };
};
export default useLocalStorage;
