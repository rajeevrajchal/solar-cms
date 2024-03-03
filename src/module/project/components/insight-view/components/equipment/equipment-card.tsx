import useInventories from "@hook/data/inventory/use-inventories";
import {
  Button,
  Fieldset,
  Grid,
  Group,
  Loader,
  Select,
  TextInput,
} from "@mantine/core";
import { INVENTORY } from "@model/inventory";
import { filter, find, map } from "lodash";
import { useEffect } from "react";
import { MdRemove } from "react-icons/md";

interface EquipmentCardProps {
  index: number;
  equipment: any;
  equipmentForm: any;
  removeItem: (index: number) => void;
}

const EquipmentCard = (props: EquipmentCardProps) => {
  const { index, equipment, equipmentForm, removeItem } = props;

  const { loading, inventories } = useInventories();

  const getInventoryOptions = () => {
    return map(
      filter(
        inventories,
        (inventory: INVENTORY) =>
          inventory.category === equipment.component_type
      ),
      (inventory: INVENTORY) => ({
        label: `${inventory.name} [V: ${inventory.voltage}, W: ${inventory.watt}, A: ${inventory.ampere} ]`,
        value: inventory.id,
      })
    );
  };

  const handleQuantityChange = (index: number, value: string | number) => {
    equipmentForm.setFieldValue(`equipments[${index}].quantity`, value);
  };

  const handleVoltageAndAmpereChange = () => {
    const { quantity, connection, inventory } = equipment;
    const item: any = find(inventories, (item: any) => item.id === inventory);
    if (item) {
      equipmentForm.setFieldValue(
        `equipments[${index}].voltage`,
        connection === "series" ? item.voltage * quantity : item.voltage
      );
      equipmentForm.setFieldValue(
        `equipments[${index}].watt`,
        connection === "series" ? item.watt * quantity : item.watt
      );
    }
  };

  useEffect(() => {
    handleVoltageAndAmpereChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [equipment.quantity, equipment.connection, equipment.inventory]);

  return (
    <Fieldset legend={`set-${index + 1}`} p="xs">
      <Grid>
        <Grid.Col
          span={{
            base: 6,
            lg: 3,
          }}
        >
          <Select
            label="Component"
            styles={{
              option: {
                textTransform: "capitalize",
              },
            }}
            placeholder="Select Component"
            clearable
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
            value={equipment.component_type}
            onChange={(value) =>
              equipmentForm.setFieldValue(
                `equipments[${index}].component_type`,
                value
              )
            }
          />
        </Grid.Col>
        <Grid.Col
          span={{
            base: 6,
            lg: 3,
          }}
        >
          <Select
            label="Choose From Inventory"
            styles={{
              option: {
                textTransform: "capitalize",
              },
            }}
            placeholder="Select Item"
            rightSection={
              loading ? <Loader color="blue" size="xs" type="dots" /> : ""
            }
            disabled={!equipment.component_type}
            value={equipment.inventory}
            onChange={(value) =>
              equipmentForm.setFieldValue(
                `equipments[${index}].inventory`,
                value
              )
            }
            clearable
            searchable
            data={[
              {
                label: "Select Inventory",
                value: "",
                disabled: true,
              },
              ...getInventoryOptions(),
            ]}
          />
        </Grid.Col>
        <Grid.Col
          span={{
            base: 6,
            lg: 3,
          }}
        >
          <TextInput
            label="Total Quantity in set"
            placeholder="quantity"
            name={`equipments[${index}].quantity`}
            type="number"
            disabled={!equipment.component_type || !equipment.inventory}
            value={equipment.quantity}
            onChange={(e) => handleQuantityChange(index, e.target.value)}
          />
        </Grid.Col>
        <Grid.Col
          span={{
            base: 6,
            lg: 3,
          }}
        >
          <Select
            label="Set Connection"
            placeholder="Select connection"
            styles={{
              option: {
                textTransform: "capitalize",
              },
            }}
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
            disabled={!equipment.component_type || !equipment.inventory}
            value={equipment.connection}
            onChange={(value) =>
              equipmentForm.setFieldValue(
                `equipments[${index}].connection`,
                value
              )
            }
          />
        </Grid.Col>
        <Grid.Col
          span={{
            base: 6,
            lg: 3,
          }}
        >
          <TextInput
            label="Voltage"
            placeholder="** voltage"
            name={`equipments[${index}].voltage`}
            value={equipment.voltage}
            disabled
            onChange={equipmentForm.handleChange}
          />
        </Grid.Col>
        <Grid.Col
          span={{
            base: 6,
            lg: 3,
          }}
        >
          <TextInput
            label="Watt"
            placeholder="** watt"
            name={`equipments[${index}].watt`}
            value={equipment.watt}
            disabled
            onChange={equipmentForm.handleChange}
          />
        </Grid.Col>
        <Grid.Col
          span={{
            base: 8,
            lg: 4,
          }}
        >
          <TextInput
            label="Set Name (Optional)"
            placeholder="Enter Set Name"
            name={`equipments[${index}].set_name`}
            value={equipment.set_name}
            onChange={equipmentForm.handleChange}
          />
        </Grid.Col>
        <Grid.Col
          span={{
            base: 4,
            lg: 2,
          }}
        >
          <Group justify="flex-end" mt={26}>
            <Button
              leftSection={<MdRemove />}
              variant="light"
              fullWidth={false}
              onClick={() => removeItem(index)}
            >
              Remove
            </Button>
          </Group>
        </Grid.Col>
      </Grid>
    </Fieldset>
  );
};

export default EquipmentCard;
