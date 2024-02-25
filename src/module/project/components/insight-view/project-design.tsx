import { useFormik } from "formik";
import ProjectInsightHeader from "./insight-header";
import { useNavigate } from "react-router-dom";
import {
  ActionIcon,
  Button,
  Group,
  Select,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { PROJECTS } from "@model/project";
import { useState } from "react";
import Modal from "@components/modal/modal";
import UploadDesignModal from "./components/design/upload-design-modal";
import { FaPlus } from "react-icons/fa";
import { MdRemove } from "react-icons/md";
import Table from "@components/table";
import useProjectMutate from "@module/project/hooks/use-project-mutate";

interface ProjectDesignProps {
  project: PROJECTS;
}

const ProjectDesign = (props: ProjectDesignProps) => {
  const { project } = props;
  const navigate = useNavigate();
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false);
  const { uploadProjectModel } = useProjectMutate();

  const inSightForm: any = useFormik({
    initialValues: {
      design_file: [],
      connection: [],
    },
    onSubmit: (values) => {
      uploadProjectModel.mutate(
        {
          id: project.id,
          connection: values.connection,
          models: values.design_file,
        },
        {
          onSuccess: () => {
            setShowUploadModal(false);
          },
        }
      );
    },
  });

  const addItem = () => {
    inSightForm.setFieldValue("connection", [
      ...inSightForm.values.connection,
      {},
    ]);
  };

  const removeItem = (index: number) => {
    const updatedConnection = [...inSightForm.values.connection];
    updatedConnection.splice(index, 1);
    inSightForm.setFieldValue("connection", updatedConnection);
  };

  const onBack = () => {
    inSightForm.resetForm();
    navigate(-1);
  };

  return (
    <Stack gap={2}>
      <ProjectInsightHeader
        project={project}
        onContinue={() => setShowUploadModal(true)}
        onBack={() => onBack()}
      />

      <Table
        label="Define Connection"
        headerContent={
          <Button
            leftSection={<FaPlus />}
            variant="subtle"
            fullWidth={false}
            onClick={() => addItem()}
          >
            Add Connection Row
          </Button>
        }
        columns={[
          {
            accessor: "set_name",
            title: "Set Name",
            sortable: true,
            textAlign: "left",
            ellipsis: true,
            render: (record: any, index: number) => {
              return (
                <TextInput
                  placeholder="Enter Set Name"
                  value={record.set_name}
                  name={`connection.[${index}].set_name`}
                  onChange={inSightForm.handleChange}
                  error={
                    inSightForm.touched?.connection?.[index]?.set_name &&
                    inSightForm.errors?.connection?.[index]?.set_name &&
                    inSightForm.errors?.connection?.[index]?.set_name
                  }
                />
              );
            },
          },
          {
            accessor: "set",
            title: "Choose Set",
            sortable: true,
            textAlign: "left",
            ellipsis: true,
            render: (record: any, index: number) => {
              return (
                <Select
                  value={record?.set_a}
                  placeholder="Select Component"
                  onChange={(value) =>
                    inSightForm.setFieldValue(
                      `connection.[${index}].set_a`,
                      value
                    )
                  }
                  data={[
                    {
                      label: "Panel",
                      value: "panel",
                    },
                    {
                      label: "Battery",
                      value: "battery",
                    },
                    {
                      label: "MPU",
                      value: "mpu",
                    },
                    {
                      label: "Invertor",
                      value: "invertor",
                    },
                    {
                      label: "Wire",
                      value: "wire",
                    },
                  ]}
                  error={
                    inSightForm.touched?.connection?.[index]?.set_a &&
                    inSightForm.errors?.connection?.[index]?.set_a &&
                    inSightForm.errors?.connection?.[index]?.set_a
                  }
                />
              );
            },
          },
          {
            accessor: "set_a_definition",
            title: "",
            textAlign: "left",
            ellipsis: true,
            render: () => {
              return (
                <Stack gap={0}>
                  <Text size="xs">Info</Text>
                  <Group>
                    <Group>
                      <Text size="xs">V: </Text>
                      <Text size="xs">N/A</Text>
                    </Group>
                    <Group>
                      <Text size="xs">A [W]: </Text>
                      <Text size="xs">N/A</Text>
                    </Group>
                  </Group>
                </Stack>
              );
            },
          },
          {
            accessor: "set_b",
            title: "Choose Set",
            sortable: true,
            textAlign: "left",
            ellipsis: true,
            render: (record: any, index: number) => {
              return (
                <Select
                  value={record?.set_b}
                  placeholder="Select Component"
                  onChange={(value) =>
                    inSightForm.setFieldValue(
                      `connection.[${index}].set_b`,
                      value
                    )
                  }
                  data={[
                    {
                      label: "Panel",
                      value: "panel",
                    },
                    {
                      label: "Battery",
                      value: "battery",
                    },
                    {
                      label: "MPU",
                      value: "mpu",
                    },
                    {
                      label: "Invertor",
                      value: "invertor",
                    },
                    {
                      label: "Wire",
                      value: "wire",
                    },
                  ]}
                  error={
                    inSightForm.touched?.connection?.[index]?.set_b &&
                    inSightForm.errors?.connection?.[index]?.set_b &&
                    inSightForm.errors?.connection?.[index]?.set_b
                  }
                />
              );
            },
          },
          {
            accessor: "set_b_definition",
            title: "",
            textAlign: "left",
            ellipsis: true,
            render: () => {
              return (
                <Stack gap={0}>
                  <Text size="xs">Set B description</Text>
                  <Group>
                    <Group>
                      <Text size="xs">V: </Text>
                      <Text size="xs">N/A</Text>
                    </Group>
                    <Group>
                      <Text size="xs">A [W]: </Text>
                      <Text size="xs">N/A</Text>
                    </Group>
                  </Group>
                </Stack>
              );
            },
          },
          {
            accessor: "connection",
            title: "Set Item Connection",
            sortable: true,
            textAlign: "left",
            ellipsis: true,
            render: (record: any, index: number) => {
              return (
                <Select
                  value={record?.connection}
                  placeholder="Select connection"
                  disabled={record?.component_type === "wire"}
                  data={[
                    {
                      label: "Parallel",
                      value: "parallel",
                    },
                    {
                      label: "Series",
                      value: "series",
                    },
                  ]}
                  onChange={(value) =>
                    inSightForm.setFieldValue(
                      `connection.[${index}].connection`,
                      value
                    )
                  }
                  error={
                    inSightForm.touched?.connection?.[index]?.connection &&
                    inSightForm.errors?.connection?.[index]?.connection &&
                    inSightForm.errors?.connection?.[index]?.connection
                  }
                />
              );
            },
          },
          {
            accessor: "action",
            title: "",
            textAlign: "left",
            ellipsis: true,
            width: 50,
            render: (_: any, index: number) => {
              return (
                <ActionIcon variant="light" onClick={() => removeItem(index)}>
                  <MdRemove />
                </ActionIcon>
              );
            },
          },
        ]}
        data={inSightForm.values.connection}
      />

      <Modal
        opened={showUploadModal}
        close={() => setShowUploadModal(false)}
        title="Upload Design"
      >
        <UploadDesignModal
          form={inSightForm}
          closeModal={() => setShowUploadModal(false)}
          handleContinue={() => inSightForm.handleSubmit()}
        />
      </Modal>
    </Stack>
  );
};

export default ProjectDesign;
