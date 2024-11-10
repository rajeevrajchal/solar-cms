import { LOGIN_TYPE } from "@api/types/auth.type";
import useAuth from "@hook/store/use-auth";
import useEnterKeyPress from "@hook/utils/use-enter";
import {
  Button,
  Card,
  NavLink,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import loginValidationSchema from "@module/auth/validations/login-validation";
import AppRoute from "@routes/route.constant";
import { useFormik } from "formik";
import { MdAlternateEmail, MdLockOpen } from "react-icons/md";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const { login } = useAuth();

  const loginForm = useFormik<LOGIN_TYPE>({
    initialValues: {
      email: "engineer@studio.io",
      password: "123456789",
    },
    validationSchema: loginValidationSchema,
    onSubmit: (values) => {
      login.mutate(values);
    },
  });

  useEnterKeyPress(loginForm.handleSubmit);

  return (
    <Card bg="transparent" p={0}>
      <Stack>
        <Title variant="h6">Login</Title>
        <Text fs="xs">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident,
          quidem!
        </Text>
      </Stack>
      <Stack mt="md">
        <TextInput
          label="Email"
          type="email"
          placeholder="your@email.com"
          name="email"
          leftSection={<MdAlternateEmail />}
          value={loginForm.values.email}
          onChange={loginForm.handleChange}
          error={
            loginForm?.errors.email && loginForm?.touched?.email
              ? loginForm?.errors.email
              : ""
          }
        />
        <PasswordInput
          label="Password"
          placeholder="********"
          name="password"
          leftSection={<MdLockOpen />}
          value={loginForm.values.password}
          onChange={loginForm.handleChange}
          error={
            loginForm?.errors.password && loginForm?.touched?.password
              ? loginForm?.errors.password
              : ""
          }
        />
        <NavLink
          p={0}
          w="fit-content"
          label="Forget Password ?"
          component={Link}
          to={AppRoute.forget_password}
          variant="subtle"
        />
        <Button
          disabled={login?.isPending}
          loading={login?.isPending}
          onClick={() => loginForm.handleSubmit()}
        >
          Login
        </Button>
      </Stack>
    </Card>
  );
};

export default LoginForm;
