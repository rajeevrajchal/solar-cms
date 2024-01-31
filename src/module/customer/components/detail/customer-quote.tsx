import { QUOTE } from "@model/quote";

interface CustomerQuoteProps {
  quotes: QUOTE[];
}

const CustomerQuote = (props: CustomerQuoteProps) => {
  const { quotes } = props;
  return (
    <div>
      CustomerQuote <pre>{JSON.stringify(quotes, null, 2)}</pre>
    </div>
  );
};

export default CustomerQuote;
