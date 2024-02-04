import QuoteService from "@api/services/quote.service";
import { useDebounce } from "@hook/utils/use-debounce";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

const useQuotes = () => {
  const [searchParams] = useSearchParams();
  const debouncedValue = useDebounce<string>(
    searchParams.get("search") || "",
    500
  );

  const quotes = useQuery({
    queryKey: [
      "quotes",
      searchParams.get("category"),
      debouncedValue,
      searchParams.get("vendor"),
    ],
    queryFn: () =>
      QuoteService.list({
        search: debouncedValue || "",
      }),
  });

  return {
    loading: quotes.isLoading || quotes.isFetching,
    quotes: (quotes.data as any) || [],
  };
};

export default useQuotes;
