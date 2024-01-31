import { Group, ActionIcon, Stack, Text } from "@mantine/core";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";

const SocialLogin = () => {
  return (
    <Stack>
      <Text fs="xl" fw="bold">
        Login with
      </Text>
      <Group>
        <ActionIcon variant="outline" size="xl" radius="xl">
          <FcGoogle size={24} />
        </ActionIcon>
        <ActionIcon variant="outline" size="xl" radius="xl">
          <FaFacebookF size={24} />
        </ActionIcon>
      </Group>
      <Text fs="xl" fw="bold">
        OR
      </Text>
    </Stack>
  );
};

export default SocialLogin;
