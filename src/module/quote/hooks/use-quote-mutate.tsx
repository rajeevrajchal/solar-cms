import QuoteService, { QUOTE_INPUT } from "@api/services/quote.service";
import AppRoute from "@routes/route.constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import exportFile from "@utils/functions/export-file";
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

  const deleteQuote = useMutation({
    mutationFn: (quote_id: string | undefined) => QuoteService.delete(quote_id),
    onSuccess: () => {
      toast.success("Quote is deleted.");
      queryClient.invalidateQueries({
        queryKey: ["quotes"],
      });
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to delete");
    },
  });

  const approveQuote = useMutation({
    mutationFn: (quote_id: string | undefined) =>
      QuoteService.approve(quote_id),
    onSuccess: () => {
      toast.success("Quote is approved.");
      queryClient.invalidateQueries({
        queryKey: ["quotes"],
      });
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to approved");
    },
  });

  const rejectQuote = useMutation({
    mutationFn: (quote_id: string | undefined) => QuoteService.reject(quote_id),
    onSuccess: () => {
      toast.success("Quote is rejected.");
      queryClient.invalidateQueries({
        queryKey: ["quotes"],
      });
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to reject");
    },
  });

  const downloadQuote = useMutation({
    mutationFn: (quote_id: string | undefined) =>
      QuoteService.download(quote_id),
    onSuccess: (data: any) => {
      const contentDisposition = data.headers.get("Content-Disposition");
      const filename = contentDisposition.split(";")[1].split("=")[1];
      exportFile(filename, data?.data);
      toast.success("Quote downloaded.");
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to download");
    },
  });

  return {
    createQuote,
    updateQuote,
    downloadQuote,
    deleteQuote,
    approveQuote,
    rejectQuote,
  };
};

export default useQuoteMutate;
