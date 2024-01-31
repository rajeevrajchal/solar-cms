import * as Yup from "yup";

const createInventoryValidation = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  vendor_id: Yup.string().required("Vendor is required"),
  category: Yup.string().required("Category is required"),
  // nature: Yup.string().required("Email is required"),

  voltage: Yup.string().required("Voltage is required"),
  ampere: Yup.string().required("Ampere is required"),
  watt: Yup.string().required("Watt is required"),

  buying_cost: Yup.string().required("Buying cost is required"),
  selling_cost: Yup.string().required("Selling cost is required"),
});

export default createInventoryValidation;
