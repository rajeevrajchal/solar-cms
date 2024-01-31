import * as Yup from "yup";

const createProjectValidation = [
  Yup.object().shape({
    customer: Yup.object().shape({
      email: Yup.string().email().required("Email is required"),
      phone: Yup.string().required("Phone is required"),
      name: Yup.string().required("Name is required"),
    }),
  }),
];

export default createProjectValidation;
