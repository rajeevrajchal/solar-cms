import useStepper from "@hook/utils/use-stepper";
import { PROJECTS } from "@model/project";
import useCustomerMutate from "@module/customer/hooks/use-customer-mutate";
import useProjectMutate from "@module/project/hooks/use-project-mutate";
import { useFormik } from "formik";
import { omit } from "lodash";
import { useNavigate } from "react-router-dom";
import createProjectValidation from "./create-project-validation";
import CustomerInfo from "./customer-info";
import FormLayout from "./form-layout";
import ProjectInfo from "./project-info";

interface ProjectFormProps {
  data?: Partial<PROJECTS>;
  hideCustomer?: boolean;
}
const ProjectForm = (props: ProjectFormProps) => {
  const { data, hideCustomer } = props;

  const { createCustomer } = useCustomerMutate();
  const { createProject, updateProjectBySale } = useProjectMutate();
  const navigate = useNavigate();

  const { active, nextStep } = useStepper({
    steps: 2,
    activeIndex: hideCustomer ? 1 : 0,
  });

  const projectForm = useFormik({
    initialValues: {
      customer: {
        customer_id: data?.customer_id || "",
        name: data?.customer?.name || "",
        email: data?.customer?.email || "",
        phone: data?.customer?.phone || "",
        location: data?.customer?.location || "",
      },
      project: {
        latitude: data?.latitude || 51.505,
        longitude: data?.longitude || -0.09,
        location: data?.location || "",
        panel_info: data?.panel_info || "",
        battery_type: data?.battery_type || "",
        cleaning: data?.cleaning || "yes",
        mark_location_customer: data?.mark_location_customer || false,
        estimated_area: data?.estimated_area || "",
        capacity: data?.capacity || "",
      },
    },
    validationSchema: createProjectValidation[active],
    onSubmit: (values: any, { setFieldValue }) => {
      if (active === 0 && !values.customer.customer_id) {
        createCustomer.mutate(omit(values.customer, ["customer_id"]), {
          onSuccess: (data: any) => {
            setFieldValue("customer.customer_id", data?.customer?.id);
            nextStep();
          },
        });
      } else if (active === 1) {
        data?.id
          ? updateProjectBySale.mutate(
              {
                ...values.project,
                cleaning: values.cleaning === "yes",
                customer_id: values.customer.customer_id,
                id: data?.id,
              },
              {
                onSuccess: () => {
                  navigate(-1);
                },
              }
            )
          : createProject.mutate(
              {
                ...values.project,
                cleaning: values.cleaning === "yes",
                customer_id: values.customer.customer_id,
              },
              {
                onSuccess: () => {
                  navigate(-1);
                },
              }
            );
      } else {
        nextStep();
      }
    },
  });

  const continueAsGuest = (guest: string) => {
    projectForm.setFieldValue("customer.customer_id", guest);
    nextStep();
  };

  const steps = [
    {
      label: "Customer",
      component: (
        <CustomerInfo form={projectForm} continueAsGuest={continueAsGuest} />
      ),
    },
    {
      label: "Project",
      component: <ProjectInfo form={projectForm} />,
    },
  ];

  return (
    <FormLayout
      label={steps[active].label}
      onSubmit={() => projectForm.handleSubmit()}
      loading={createCustomer.isPending || createProject.isPending}
      isProject={active === 1}
      hideSkip={hideCustomer}
    >
      {steps[active].component}
    </FormLayout>
  );
};

export default ProjectForm;
