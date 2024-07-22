import { Helmet } from "react-helmet";

interface HeadProps {
  title: string;
}

const Head = (props: HeadProps) => {
  const { title } = props;
  return (
    <Helmet>
      <title>{title ? `${title} | ` : ""} Solar Studio</title>
    </Helmet>
  );
};

export default Head;
