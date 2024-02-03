import { Route, Routes } from "react-router-dom";
import QuoteList from "./view/quote-list";
import NotFound from "@components/errors/not-found";
import CreateQuote from "./view/create-quote";
import QuoteDetail from "./view/quote-detail";

const Quote = () => {
  return (
    <Routes>
      <Route index element={<QuoteList />} />
      <Route path="create" element={<CreateQuote />} />
      <Route path=":quote_id" element={<QuoteDetail />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Quote;
