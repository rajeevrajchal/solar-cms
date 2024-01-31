import { Stack, Center, Box, Image } from "@mantine/core";
import LoginForm from "./components/login-form";
import SocialLogin from "./components/social-login";
import logo from "@assets/logo/png/logo_transparent.png";

const Login = () => {
  return (
    <Stack justify="center" h="100%">
      <Center>
        <Stack
          w={{ base: "100%", sm: "60%" }}
          px={{ base: "lg", sm: 0 }}
          gap="md"
        >
          <Center>
            <Box display={{ base: "block", sm: "none" }} w="60%">
              <Image src={logo} />
            </Box>
          </Center>
          <SocialLogin />
          <LoginForm />
        </Stack>
      </Center>
    </Stack>
  );
};

export default Login;
