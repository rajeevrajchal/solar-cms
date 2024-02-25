import Modal, { ModalProps } from "@components/modal/modal";
import useProjectMutate from "@module/project/hooks/use-project-mutate";
import useEngineers from "@hook/data/users/use-engineer";
import { Button, Flex, Loader, Select, Stack } from "@mantine/core";
import { USER } from "@model/user";
import { useFormik } from "formik";
import { find, map } from "lodash";

interface ProjectAssignMeProps extends Omit<ModalProps, "children"> {
  project_id: string;
  owner_key?: string;
  close: () => void;
}

const ProjectAssignOwner = (props: ProjectAssignMeProps) => {
  const { close, project_id } = props;
  const { loading, users } = useEngineers();
  const { assignOwnerToProject } = useProjectMutate();

  const projectOwnerForm = useFormik({
    initialValues: {
      owner_id: "",
      owner_role: "",
    },
    onSubmit: (values) => {
      assignOwnerToProject.mutate(
        {
          project_id: project_id,
          owner_id: values.owner_id,
          owner_type: values.owner_role,
        },
        {
          onSuccess: () => {
            close();
          },
        }
      );
    },
  });

  const handleOwnerChange = (value: string | null) => {
    if (value === null) {
      return;
    }
    const user: any = find(users, (user: USER) => user?.id === value);
    projectOwnerForm.setFieldValue("owner_id", value, true);
    projectOwnerForm.setFieldValue("owner_role", user?.role, true);
    return value;
  };

  return (
    <Modal {...props}>
      <Stack>
        <Select
          searchable
          placeholder="Select Engineer"
          clearable
          value={projectOwnerForm.values.owner_id}
          onChange={handleOwnerChange}
          autoFocus={false}
          rightSection={
            loading ? <Loader color="blue" size="xs" type="dots" /> : ""
          }
          data={[
            ...map(users, (user: USER) => {
              return {
                label: `${user.name} [${user.email}]`,
                value: user.id,
              };
            }),
          ]}
        />
        <Flex justify="end" gap="md">
          <Button
            variant="subtle"
            onClick={() => close()}
            disabled={assignOwnerToProject.isPending}
          >
            Cancel
          </Button>
          <Button
            variant="light"
            loading={assignOwnerToProject.isPending}
            disabled={assignOwnerToProject.isPending}
            onClick={() => projectOwnerForm.handleSubmit()}
          >
            Assign User
          </Button>
        </Flex>
      </Stack>
    </Modal>
  );
};

export default ProjectAssignOwner;
