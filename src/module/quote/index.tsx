import { Route, Routes } from "react-router-dom";
import QuoteList from "./view/quote-list";
import NotFound from "@components/errors/not-found";

const Quote = () => {
  return (
    <Routes>
      <Route index element={<QuoteList />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Quote;
