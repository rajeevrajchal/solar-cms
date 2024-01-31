import * as Yup from "yup";

const loginValidationSchema = Yup.object().shape({
  email: Yup.string().email().required("Email is required"),
  // password: Yup.string()
  //   .required("Password is required")
  //   .min(8, "Password must be at least 8 characters")
  //   .matches(/[a-z]/, "Password must contain at least one lowercase letter")
  //   .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
  //   .matches(/\d/, "Password must contain at least one number")
  //   .matches(
  //     /[!@#$%^&*(),.?":{}|<>/]/,
  //     "Password must contain at least one special character"
  //   ),
});

export default loginValidationSchema;
