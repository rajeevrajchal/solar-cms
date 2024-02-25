import NotFound from "@components/errors/not-found";
import useQuotes from "@module/quote/hooks/use-quote";
import { Center, Loader } from "@mantine/core";
import CreateQuoteForm from "../components/create";

const QuoteDetail = () => {
  const { error, loading, quote } = useQuotes();
  if (loading) {
    return (
      <Center>
        <Loader color="blue" size="xl" type="dots" />
      </Center>
    );
  }

  if (error) {
    return <NotFound />;
  }
  return <CreateQuoteForm data={quote} />;
};

export default QuoteDetail;
