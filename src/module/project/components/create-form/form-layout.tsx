import { Button, Flex, Stack, Text } from "@mantine/core";
import { ReactElement } from "react";

interface FormLayoutProps {
  label: string;
  loading: boolean;
  isProject: boolean;
  hideSkip?: boolean;
  children: ReactElement;
  onSubmit: () => void;
}

const FormLayout = (props: FormLayoutProps) => {
  const { label, loading, isProject, hideSkip, children, onSubmit } = props;

  return (
    <Stack gap="sm">
      <Flex align="center" justify="space-between">
        <Text size="lg" fw="bold">
          {label}
        </Text>
        <Flex align="center" justify="flex-end" gap="md">
          {isProject && !hideSkip ? (
            <Button
              variant="light"
              onClick={() => onSubmit()}
              disabled={loading}
            >
              Skip Project Info
            </Button>
          ) : null}
          <Button
            onClick={() => onSubmit()}
            loading={loading}
            disabled={loading}
          >
            {isProject ? "Save Project Info" : "Save Customer & Continue"}
          </Button>
        </Flex>
      </Flex>
      {children}
    </Stack>
  );
};

export default FormLayout;
