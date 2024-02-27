import { RESET_PASSWORD } from "@api/types/auth.type";
import useAuthMutate from "@hook/data/auth/use-auth-mutate";
import { Button, Card, PasswordInput, Stack, Text } from "@mantine/core";
import AppRoute from "@routes/route.constant";
import { useFormik } from "formik";
import { MdLockOpen } from "react-icons/md";
import { Navigate, useSearchParams } from "react-router-dom";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const { resetPassword } = useAuthMutate();

  const resetForm = useFormik({
    initialValues: {
      password: "",
      token: searchParams.get("token"),
    },
    onSubmit: (values) => {
      resetPassword.mutate(values as RESET_PASSWORD);
    },
  });

  if (!searchParams.get("token")) {
    return <Navigate to={AppRoute.login} replace={true} />;
  }

  return (
    <Card bg="transparent" p={0}>
      <Text fs="xl" fw="bold">
        Reset Password
      </Text>
      <Text fs="8" c="gray">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem, harum?
      </Text>
      <Stack>
        <PasswordInput
          label="Password"
          placeholder="********"
          name="password"
          leftSection={<MdLockOpen />}
          value={resetForm.values.password}
          onChange={resetForm.handleChange}
          error={
            resetForm?.errors.password && resetForm?.touched?.password
              ? resetForm?.errors.password
              : ""
          }
        />
        <Button
          disabled={resetPassword.isPending}
          loading={resetPassword.isPending}
          onClick={() => resetForm.handleSubmit()}
        >
          Reset Password
        </Button>
      </Stack>
    </Card>
  );
};

export default ResetPassword;
