import { USER_ROLE } from "@enum/user.role";
import useUserMutate from "@module/user/hooks/use-user-mutate";
import {
  Button,
  Fieldset,
  Group,
  Select,
  Stack,
  TextInput,
} from "@mantine/core";
import { USER } from "@model/user";
import { useFormik } from "formik";
import { isEmpty } from "lodash";
import { useNavigate } from "react-router-dom";

interface UserCreateFormProps {
  data?: USER;
}

const UserCreateForm = (props: UserCreateFormProps) => {
  const { data } = props;
  const navigate = useNavigate();
  const { create, update } = useUserMutate();

  const userFormik: any = useFormik({
    initialValues: {
      name: data?.name ?? "",
      email: data?.email ?? "",
      role: data?.role ?? "",
      phone: data?.phone ?? "",
    },
    onSubmit: (values: any) => {
      if (!isEmpty(data) && data?.id) {
        update.mutate({
          payload: values,
          user_id: data?.id,
        });
      } else {
        create.mutate(values);
      }
    },
  });

  const handleCancel = () => {
    userFormik.resetForm();
    navigate(-1);
  };

  return (
    <Stack p="md">
      <Fieldset legend="User information" variant="unstyled">
        <TextInput
          label="Name"
          placeholder="User Name"
          name="name"
          onChange={userFormik.handleChange}
          value={userFormik.values.name}
          withAsterisk
          error={
            userFormik.touched?.name &&
            userFormik.errors?.name &&
            userFormik.errors?.name
          }
        />
        <TextInput
          label="Email"
          placeholder="Email"
          mt="xs"
          name="email"
          onChange={userFormik.handleChange}
          value={userFormik.values.email}
          withAsterisk
          error={
            userFormik.touched?.email &&
            userFormik.errors?.email &&
            userFormik.errors?.email
          }
        />
        <Select
          label="Select Role"
          mt="xs"
          withAsterisk
          value={userFormik.values.role}
          placeholder="Select Role"
          onChange={(value) => userFormik.setFieldValue(`role`, value)}
          data={[
            {
              label: "Sale",
              value: USER_ROLE.SALE.toUpperCase(),
            },
            {
              label: "Engineer",
              value: USER_ROLE.ENGINEER.toUpperCase(),
            },
            {
              label: "Site Engineer",
              value: USER_ROLE.WORKER.toUpperCase(),
            },
          ]}
          error={
            userFormik.touched?.role &&
            userFormik.errors?.role &&
            userFormik.errors?.role
          }
        />
        <TextInput
          label="Contact"
          placeholder="Mobile Number"
          mt="xs"
          name="phone"
          value={userFormik.values.phone}
          onChange={userFormik.handleChange}
          error={
            userFormik.touched?.phone &&
            userFormik.errors?.phone &&
            userFormik.errors?.phone
          }
        />
      </Fieldset>
      <Group mt="xs" justify="flex-end">
        <Button
          variant="subtle"
          onClick={() => handleCancel()}
          disabled={update.isPending || create.isPending}
        >
          Cancel
        </Button>
        <Button
          variant="light"
          onClick={() => userFormik.handleSubmit()}
          loading={update.isPending || create.isPending}
          disabled={update.isPending || create.isPending}
        >
          {isEmpty(data) ? "Add" : "Update"}
        </Button>
      </Group>
    </Stack>
  );
};

export default UserCreateForm;
