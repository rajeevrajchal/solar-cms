import { Alert, Button, Stack, Text } from "@mantine/core";
import { QUOTE } from "@model/quote";

interface ProjectQuoteProps {
  quote: QUOTE[];
}

const ProjectQuote = (props: ProjectQuoteProps) => {
  const { quote } = props;

  if (quote.length <= 0) {
    return (
      <Alert variant="light" color="blue">
        <Text>You don't have any quote created. Please create one</Text>
        <Button mt="md" component="a">
          Create Quote
        </Button>
      </Alert>
    );
  }
  return (
    <Stack>
      <pre>{JSON.stringify(quote, null, 2)}</pre>
    </Stack>
  );
};

export default ProjectQuote;
