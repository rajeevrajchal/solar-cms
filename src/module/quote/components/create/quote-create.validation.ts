import * as Yup from "yup";

const QuoteCreateValidation = Yup.object().shape({
  project_id: Yup.string().required("Project is required"),
});

export default QuoteCreateValidation;
