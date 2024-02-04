import { Alert, Button, Text } from "@mantine/core";
import { QUOTE } from "@model/quote";
import CreateQuoteForm from "@module/quote/components/create";
import AppRoute from "@routes/route.constant";

interface ProjectQuoteProps {
  quote: QUOTE;
  project_id: string;
}

const ProjectQuote = (props: ProjectQuoteProps) => {
  const { quote, project_id } = props;

  if (!quote) {
    return (
      <Alert variant="light" color="blue">
        <Text>You don't have any quote created. Please create one</Text>
        <Button mt="md" component="a" href={AppRoute.create_quote(project_id)}>
          Create Quote
        </Button>
      </Alert>
    );
  }
  return <CreateQuoteForm data={quote} />;
};

export default ProjectQuote;
