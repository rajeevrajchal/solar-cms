import {
  Stack,
  Table,
  Text,
  Button,
  TextInput,
  ActionIcon,
  Group,
} from "@mantine/core";
import { useFormik } from "formik";
import { IoMdAdd, IoMdTrash } from "react-icons/io";
import { IoSaveOutline } from "react-icons/io5";
import { GrPowerReset } from "react-icons/gr";
import { MdOutlineCloudUpload } from "react-icons/md";
import { RiCustomerService2Fill } from "react-icons/ri";
import usePublicProjectMutate from "@module/public/hooks/use-public-project-mutation";
import { ELECTRIC_LOAD } from "@api/types/project-input.type";
import { useState } from "react";
import { ELECTRICLOAD } from "@model/electric_load";
import useProjectMutate from "@module/project/hooks/use-project-mutate";
import useAuth from "@hook/store/use-auth";
import { includes } from "lodash";
import { STATUS } from "@enum/status.enum";

interface LoadTableProps {
  project_id: string;
  loads: ELECTRICLOAD[];
  status?: STATUS;
}
const LoadTable = (props: LoadTableProps) => {
  const { project_id, loads, status = STATUS.NEW } = props;
  const { isLoggedIn } = useAuth();
  const { uploadElectricLoad } = usePublicProjectMutate();
  const { requestFillProjectLoad } = useProjectMutate();
  const [readOnly, setReadonly] = useState<boolean>(
    loads.length > 0 ? true : false
  );
  const loadForm = useFormik({
    initialValues: {
      load: loads
        ? loads
        : [
            {
              name: "",
              watt: "",
              quantity: "",
              hour: "",
            },
            {
              name: "",
              watt: "",
              quantity: "",
              hour: "",
            },
            {
              name: "",
              watt: "",
              quantity: "",
              hour: "",
            },
          ],
      load_csv: "",
    },
    onSubmit: (values) => {
      uploadElectricLoad.mutate(
        {
          project_id: project_id,
          payload: values.load as unknown as ELECTRIC_LOAD[],
        },
        {
          onSuccess: () => {
            setReadonly(true);
          },
        }
      );
    },
  });

  const handleAddNewItem = () => {
    loadForm.setFieldValue("load", [
      ...loadForm.values.load,
      { name: "", watt: "", quantity: "", hour: "" },
    ]);
  };

  const handleRemoveLoadItem = (index: number) => {
    const loads = [...loadForm.values.load];
    loads.splice(index, 1);
    loadForm.setFieldValue("load", loads);
  };

  const handleResetForm = () => loadForm.resetForm();

  const handleResetProject = () => {
    requestFillProjectLoad.mutate({
      project_id: project_id,
    });
  };

  if (readOnly) {
    return (
      <Stack>
        <Text>Thanks for filling the information.</Text>
      </Stack>
    );
  }

  return (
    <Stack>
      {includes([STATUS.NEW, STATUS.SITE_SURVEY], status) && (
        <Group
          align="flex-end"
          justify="space-between"
          pos="sticky"
          top={0}
          left={0}
          w="100%"
          style={{
            zIndex: 99,
          }}
        >
          <Text size="md" fw="bold" tt="capitalize">
            Electric Load
          </Text>
          {!readOnly && (
            <Group>
              <Button
                variant="light"
                leftSection={<MdOutlineCloudUpload />}
                disabled={
                  uploadElectricLoad.isPending ||
                  requestFillProjectLoad.isPending
                }
              >
                Upload CSV
              </Button>
              {isLoggedIn && (
                <Button
                  variant="light"
                  loading={requestFillProjectLoad.isPending}
                  disabled={requestFillProjectLoad.isPending}
                  leftSection={<RiCustomerService2Fill />}
                  onClick={() => handleResetProject()}
                >
                  Request Client
                </Button>
              )}
              {loadForm.dirty && (
                <>
                  <Button
                    variant="light"
                    color="red"
                    leftSection={<GrPowerReset />}
                    disabled={uploadElectricLoad.isPending}
                    onClick={() => handleResetForm()}
                  >
                    Reset
                  </Button>
                  <Button
                    leftSection={<IoSaveOutline />}
                    disabled={uploadElectricLoad.isPending}
                    loading={uploadElectricLoad.isPending}
                    onClick={() => loadForm.handleSubmit()}
                  >
                    Save
                  </Button>
                </>
              )}
            </Group>
          )}
        </Group>
      )}
      <Table withTableBorder striped withColumnBorders withRowBorders>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name [Electric Appliance]</Table.Th>
            <Table.Th>Watt [W]</Table.Th>
            <Table.Th>Quantity</Table.Th>
            <Table.Th>Hour of use [hr]</Table.Th>
            <Table.Th>Total Watt consume [W]</Table.Th>
            {!readOnly && <Table.Th />}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {loadForm.values.load.map((loadItem, index) => (
            <Table.Tr key={`electric-load-${index}`}>
              <Table.Td>
                {readOnly ? (
                  <Text>{loadItem.name}</Text>
                ) : (
                  <TextInput
                    variant={readOnly ? "unstyled" : "default"}
                    value={loadItem.name}
                    name={`load[${index}].name`}
                    onChange={loadForm.handleChange}
                  />
                )}
              </Table.Td>
              <Table.Td>
                {readOnly ? (
                  <Text>{loadItem.watt}</Text>
                ) : (
                  <TextInput
                    variant={readOnly ? "unstyled" : "default"}
                    type="number"
                    value={loadItem.watt}
                    name={`load[${index}].watt`}
                    onChange={loadForm.handleChange}
                  />
                )}
              </Table.Td>
              <Table.Td>
                {readOnly ? (
                  <Text>{loadItem.quantity}</Text>
                ) : (
                  <TextInput
                    variant={readOnly ? "unstyled" : "default"}
                    type="number"
                    value={loadItem.quantity}
                    name={`load[${index}].quantity`}
                    onChange={loadForm.handleChange}
                  />
                )}
              </Table.Td>
              <Table.Td>
                {readOnly ? (
                  <Text>{loadItem.hour}</Text>
                ) : (
                  <TextInput
                    min={0.1}
                    max={24}
                    variant={readOnly ? "unstyled" : "default"}
                    type="number"
                    value={loadItem.hour}
                    name={`load[${index}].hour`}
                    onChange={loadForm.handleChange}
                  />
                )}
              </Table.Td>
              <Table.Td>
                {+loadItem.hour * +loadItem.quantity * +loadItem.watt}
              </Table.Td>
              {!readOnly && (
                <Table.Td onClick={() => handleRemoveLoadItem(index)}>
                  <ActionIcon
                    variant="filled"
                    aria-label="Settings"
                    disabled={uploadElectricLoad.isPending}
                  >
                    <IoMdTrash />
                  </ActionIcon>
                </Table.Td>
              )}
            </Table.Tr>
          ))}
          {!readOnly && (
            <Table.Tr key="add-new">
              <Table.Td
                colSpan={5}
                align="center"
                onClick={() => handleAddNewItem()}
              >
                <Button
                  variant="subtle"
                  leftSection={<IoMdAdd size={22} />}
                  disabled={
                    uploadElectricLoad.isPending ||
                    requestFillProjectLoad.isPending
                  }
                >
                  Add new item
                </Button>
              </Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>
    </Stack>
  );
};

export default LoadTable;
