import {
  Button,
  Card,
  NavLink,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import AppRoute from "@routes/route.constant";
import loginValidationSchema from "@module/auth/validations/login-validation";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { MdAlternateEmail, MdLockOpen } from "react-icons/md";
import { LOGIN_TYPE } from "@api/types/auth.type";
import useAuth from "@hook/store/use-auth";
import useEnterKeyPress from "@hook/utils/use-enter";

const LoginForm = () => {
  const { login } = useAuth();

  const loginForm = useFormik<LOGIN_TYPE>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: (values) => {
      login.mutate(values);
    },
  });

  useEnterKeyPress(loginForm.handleSubmit);

  return (
    <Card bg="transparent" p={0}>
      <Text fs="xl" fw="bold">
        Login with email
      </Text>
      <Stack>
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
