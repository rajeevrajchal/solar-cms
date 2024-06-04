import { Button, Flex, Stack, Text } from "@mantine/core";
import { ReactElement } from "react";

interface FormLayoutProps {
  label?: string;
  loading: boolean;
  hideSkip?: boolean;
  children: ReactElement;
  onSubmit: () => void;
}

const FormLayout = (props: FormLayoutProps) => {
  const { label, loading, children, onSubmit } = props;

  return (
    <Stack gap="sm">
      <Flex align="center" justify="space-between">
        {label && (
          <Text size="lg" fw="bold">
            {label}
          </Text>
        )}
        <Flex align="center" justify="flex-end" gap="md">
          <Button
            onClick={() => onSubmit()}
            loading={loading}
            disabled={loading}
          >
            Next
          </Button>
        </Flex>
      </Flex>
      {children}
    </Stack>
  );
};

export default FormLayout;
