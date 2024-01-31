import Collapse from "@components/collapse";
import { Button, Fieldset, Flex, Stack, TextInput } from "@mantine/core";
import { USER } from "@model/user";
import { useFormik } from "formik";

interface ElectricLoadUserDetailProps {
  customer?: USER;
}
const ElectricLoadUserDetail = (props: ElectricLoadUserDetailProps) => {
  const { customer } = props;

  const userForm = useFormik({
    initialValues: {
      name: customer?.name ?? "",
      location: customer?.location ?? "",
    },
    onSubmit: (values) => {
      console.log("the values", values);
    },
  });

  return (
    <Collapse
      content={
        <Fieldset
          style={{
            flex: 2,
          }}
          mt="xs"
          radius="md"
        >
          <Stack mt="xs" w="60%">
            <TextInput
              label="Name"
              placeholder="Your Name"
              name="name"
              value={userForm.values.name}
              onChange={userForm.handleChange}
            />
            <TextInput
              label="Location"
              placeholder="Your Location"
              name="location"
              value={userForm.values.location}
              onChange={userForm.handleChange}
            />
          </Stack>
          <Flex justify="flex-start" mt="xs">
            <Button>Update Information</Button>
          </Flex>
        </Fieldset>
      }
      title="Personal information"
    />
  );
};

export default ElectricLoadUserDetail;
