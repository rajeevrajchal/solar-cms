/* eslint-disable no-unsafe-optional-chaining */
import { Box, Button, Stack, Text } from "@mantine/core";
import { FaPlus } from "react-icons/fa";
import EquipmentCard from "./equipment-card";

interface ComponentEquipmentGridProps {
  equipmentForm: any;
  removeItem: (index: number) => void;
  addItem: () => void;
}

const ComponentEquipmentGrid = (props: ComponentEquipmentGridProps) => {
  const { equipmentForm, removeItem, addItem } = props;

  return (
    <Stack gap="xs" h="full">
      <Text size="sm" fw="bold">
        Component & Equipment
      </Text>
      <Stack
        h="full"
        style={{
          overflowY: "auto",
        }}
      >
        {equipmentForm.values.equipments.map(
          (equipment: any, index: number) => (
            <EquipmentCard
              index={index}
              equipment={equipment}
              removeItem={removeItem}
              equipmentForm={equipmentForm}
              key={`equipment-${index}`}
            />
          )
        )}
        <Box>
          <Button
            leftSection={<FaPlus />}
            variant="subtle"
            fullWidth={false}
            onClick={() => addItem()}
          >
            Add Component & Equipment
          </Button>
        </Box>
      </Stack>
    </Stack>
  );
};

export default ComponentEquipmentGrid;
