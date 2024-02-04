import QuoteService from "@api/services/quote.service";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const useQuote = () => {
  const { quote_id } = useParams();
  const quote = useQuery({
    queryKey: ["quote.detail", quote_id],
    queryFn: () => QuoteService.detail(quote_id),
  });

  return {
    loading: quote.isLoading || quote.isFetching,
    quote: quote.data || [],
    ...quote,
  };
};

export default useQuote;
