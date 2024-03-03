import Table from "@components/table";
import { ActionIcon, Button, Select, Stack, TextInput } from "@mantine/core";
import { FaPlus } from "react-icons/fa";
import { MdRemove } from "react-icons/md";

interface ComponentEquipmentTableProps {
  equipmentForm: any;
  removeItem: (index: number) => void;
  addItem: () => void;
}

const ComponentEquipmentTable = (props: ComponentEquipmentTableProps) => {
  const { equipmentForm, removeItem, addItem } = props;
  return (
    <Table
      headerContent={
        <Stack>
          <Button
            leftSection={<FaPlus />}
            variant="subtle"
            fullWidth={false}
            onClick={() => addItem()}
          >
            Add Component & Equipment
          </Button>
        </Stack>
      }
      columns={[
        {
          accessor: "component_type",
          title: "Component",
          sortable: true,
          textAlign: "left",
          ellipsis: true,
          render: (record: any, index: number) => {
            return (
              <Select
                styles={{
                  option: {
                    textTransform: "capitalize",
                  },
                }}
                value={record?.component_type}
                placeholder="Select Component"
                onChange={(value) =>
                  equipmentForm.setFieldValue(
                    `equipments.[${index}].component_type`,
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
                  equipmentForm.touched?.equipments?.[index]?.component_type &&
                  equipmentForm.errors?.equipments?.[index]?.component_type &&
                  equipmentForm.errors?.equipments?.[index]?.component_type
                }
              />
            );
          },
        },
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
                name={`equipments.[${index}].set_name`}
                onChange={equipmentForm.handleChange}
                error={
                  equipmentForm.touched?.equipments?.[index]?.set_name &&
                  equipmentForm.errors?.equipments?.[index]?.set_name &&
                  equipmentForm.errors?.equipments?.[index]?.set_name
                }
              />
            );
          },
        },
        {
          accessor: "voltage",
          title: "Voltage",
          sortable: true,
          textAlign: "left",
          ellipsis: true,
          render: (record: any, index: number) => {
            return (
              <Select
                styles={{
                  option: {
                    textTransform: "capitalize",
                  },
                }}
                value={record?.voltage}
                placeholder="Select voltage"
                disabled={record?.component_type === "wire"}
                name="voltage"
                data={[
                  {
                    label: "12",
                    value: "12",
                  },
                  {
                    label: "24",
                    value: "24",
                  },
                  {
                    label: "36",
                    value: "36",
                  },
                  {
                    label: "48",
                    value: "48",
                  },
                ]}
                onChange={(value) =>
                  equipmentForm.setFieldValue(
                    `equipments.[${index}].voltage`,
                    value
                  )
                }
                error={
                  equipmentForm.touched?.equipments?.[index]?.voltage &&
                  equipmentForm.errors?.equipments?.[index]?.voltage &&
                  equipmentForm.errors?.equipments?.[index]?.voltage
                }
              />
            );
          },
        },
        {
          accessor: "watt",
          title: "Watt/Ampere",
          sortable: true,
          textAlign: "left",
          ellipsis: true,
          render: (record: any, index: number) => {
            return (
              <TextInput
                placeholder="Enter Watt"
                value={record.watt}
                disabled={record?.component_type === "wire"}
                name={`equipments.[${index}].watt`}
                onChange={equipmentForm.handleChange}
                error={
                  equipmentForm.touched?.equipments?.[index]?.watt &&
                  equipmentForm.errors?.equipments?.[index]?.watt &&
                  equipmentForm.errors?.equipments?.[index]?.watt
                }
              />
            );
          },
        },
        {
          accessor: "quantity",
          title: "Quantity",
          sortable: true,
          textAlign: "left",
          ellipsis: true,
          render: (record: any, index: number) => {
            return (
              <TextInput
                placeholder="Enter Quantity"
                value={record.quantity}
                name={`equipments.[${index}].quantity`}
                onChange={equipmentForm.handleChange}
                error={
                  equipmentForm.touched?.equipments?.[index]?.quantity &&
                  equipmentForm.errors?.equipments?.[index]?.quantity &&
                  equipmentForm.errors?.equipments?.[index]?.quantity
                }
              />
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
                styles={{
                  option: {
                    textTransform: "capitalize",
                  },
                }}
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
                  equipmentForm.setFieldValue(
                    `equipments.[${index}].connection`,
                    value
                  )
                }
                error={
                  equipmentForm.touched?.equipments?.[index]?.connection &&
                  equipmentForm.errors?.equipments?.[index]?.connection &&
                  equipmentForm.errors?.equipments?.[index]?.connection
                }
              />
            );
          },
        },
        {
          accessor: "inventory",
          title: "Inventory",
          sortable: true,
          textAlign: "left",
          ellipsis: true,
          render: (record: any, index: number) => {
            return (
              <Select
                styles={{
                  option: {
                    textTransform: "capitalize",
                  },
                }}
                value={record?.inventory}
                placeholder="Select inventory"
                data={[
                  {
                    label: "12",
                    value: "12",
                  },
                  {
                    label: "24",
                    value: "24",
                  },
                  {
                    label: "36",
                    value: "36",
                  },
                  {
                    label: "48",
                    value: "48",
                  },
                ]}
                onChange={(value) =>
                  equipmentForm.setFieldValue(
                    `equipments.[${index}].inventory`,
                    value
                  )
                }
                error={
                  equipmentForm.touched?.equipments?.[index]?.inventory &&
                  equipmentForm.errors?.equipments?.[index]?.inventory &&
                  equipmentForm.errors?.equipments?.[index]?.inventory
                }
              />
            );
          },
        },
        {
          accessor: "set_voltage",
          title: "Set Voltage",
          sortable: true,
          textAlign: "left",
          ellipsis: true,
          width: 120,
          render: (record: any) => {
            const total_voltage =
              record?.connection === "series"
                ? +record.voltage || 0
                : +record.voltage || 0 * +record.quantity || 0;
            return (
              <TextInput
                placeholder="Q. Voltage"
                disabled
                value={total_voltage}
              />
            );
          },
        },
        {
          accessor: "set_watt",
          title: "Set Watt/Ampere",
          sortable: true,
          textAlign: "left",
          ellipsis: true,
          width: 120,
          render: (record: any) => {
            const total_watt =
              record?.connection === "series"
                ? +record?.watt || 0 * +record.quantity || 0
                : +record?.watt || 0 * +record.quantity || 0;
            return (
              <TextInput placeholder="Q. Watt" disabled value={total_watt} />
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
      data={equipmentForm.values.equipments}
    />
  );
};

export default ComponentEquipmentTable;
