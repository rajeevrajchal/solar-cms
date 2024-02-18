import AppRoute from "@routes/route.constant";
import { Navigate, useSearchParams } from "react-router-dom";
import { Card, Text, Stack, Button, PasswordInput } from "@mantine/core";
import { useFormik } from "formik";
import useAuthMutate from "@hook/data/auth/use-auth-mutate";
import { MdLockOpen } from "react-icons/md";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const { resetPassword } = useAuthMutate();

  const resetForm = useFormik({
    initialValues: {
      password: "",
      confirm_password: "",
      token: searchParams.get("token"),
    },
    onSubmit: (values) => {
      console.log("values", values);
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
