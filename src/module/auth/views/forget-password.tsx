import useAuthMutate from "@hook/data/auth/use-auth-mutate";
import {
  Card,
  Text,
  Stack,
  TextInput,
  Button,
  Flex,
  PinInput,
  Center,
} from "@mantine/core";
import AppRoute from "@routes/route.constant";
import { useFormik } from "formik";
import { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { MdAlternateEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const { forgetPassword, forgetPasswordWithOTP } = useAuthMutate();
  const [openOtp, setOpenOpt] = useState<boolean>(false);

  const forgetForm = useFormik({
    initialValues: {
      email: "",
      otp: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email().required("Email is required"),
    }),
    onSubmit: (values) => {
      if (openOtp) {
        forgetPasswordWithOTP.mutate(values);
      } else {
        forgetPassword.mutate(values.email, {
          onSuccess: () => {
            setOpenOpt(true);
          },
        });
      }
    },
  });

  return (
    <Card bg="transparent" p={0}>
      <Text fs="xl" fw="bold">
        Forget Password
      </Text>
      <Text fs="8" c="gray">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem, harum?
      </Text>
      <Stack mt="md">
        {openOtp ? (
          <Center>
            <PinInput
              inputMode="numeric"
              name="otp"
              size="md"
              length={6}
              value={forgetForm.values.otp}
              disabled={
                forgetPassword.isPending || forgetPasswordWithOTP.isPending
              }
              onChange={(value: string) =>
                forgetForm.setFieldValue("otp", value)
              }
              oneTimeCode
            />
          </Center>
        ) : (
          <TextInput
            label="Email"
            type="email"
            placeholder="your@email.com"
            name="email"
            leftSection={<MdAlternateEmail />}
            value={forgetForm.values.email}
            disabled={
              forgetPassword.isPending || forgetPasswordWithOTP.isPending
            }
            onChange={forgetForm.handleChange}
            error={
              forgetForm?.errors.email && forgetForm?.touched?.email
                ? forgetForm?.errors.email
                : ""
            }
          />
        )}
        <Button
          disabled={forgetPassword.isPending || forgetPasswordWithOTP.isPending}
          loading={forgetPassword.isPending || forgetPasswordWithOTP.isPending}
          onClick={() => forgetForm.handleSubmit()}
        >
          {openOtp ? "Get Reset Link" : "Get OTP"}
        </Button>
      </Stack>
      <Flex mt="md">
        <Button
          leftSection={<FaArrowLeftLong />}
          variant="subtle"
          disabled={forgetPassword.isPending}
          onClick={() => navigate(AppRoute.login)}
        >
          Back
        </Button>
      </Flex>
    </Card>
  );
};

export default ForgetPassword;
