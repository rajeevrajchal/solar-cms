/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Fuse from "fuse.js";
import { useDebounce } from "../utils/use-debounce";

interface UseClientSearchProps {
  keys: string[];
  list: any[];
  options?: any;
}

const useClientSearch = (props: UseClientSearchProps) => {
  const { keys, list, options } = props;
  const [query, setQuery] = useState<string>("");
  const debouncedValue = useDebounce<string>(query, 500);

  const fuse = new Fuse(list, {
    keys,
    threshold: 0.1,
    useExtendedSearch: true,
    ...options,
  });

  const results = fuse.search(debouncedValue);

  return {
    query,
    setQuery,
    loading: Boolean(results.length === 0 && !debouncedValue && query),
    results: query ? results.map((fuseItem) => fuseItem.item) : list,
  };
};

export default useClientSearch;
