import QuoteService, { QUOTE_INPUT } from "@api/services/quote.service";
import AppRoute from "@routes/route.constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const useQuoteMutate = () => {
  const queryClient = useQueryClient();

  const navigate = useNavigate();
  const createQuote = useMutation({
    mutationFn: (payload: Partial<QUOTE_INPUT>) => QuoteService.create(payload),
    onSuccess: (data: any) => {
      toast.success("Quote is created.");
      navigate(AppRoute.quote_detail(data?.quote?.id));
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to create");
    },
  });

  const updateQuote = useMutation({
    mutationFn: (payload: Partial<QUOTE_INPUT>) => QuoteService.update(payload),
    onSuccess: (data: any) => {
      toast.success("Quote is created.");
      queryClient.invalidateQueries({
        queryKey: ["quote.detail", data?.quote?.id],
      });
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to create");
    },
  });

  return { createQuote, updateQuote };
};

export default useQuoteMutate;
