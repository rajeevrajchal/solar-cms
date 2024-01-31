import NotFound from "@components/errors/not-found";
import useInventory from "@hook/data/inventory/use-inventory";
import { Center, Loader } from "@mantine/core";
import InventoryForm from "../components/inventory-form";

const InventoryEdit = () => {
  const { loading, error, inventory } = useInventory();

  if (loading) {
    return (
      <Center>
        <Loader color="blue" size="xl" type="dots" />
      </Center>
    );
  }

  if (error) {
    return <NotFound />;
  }

  return <InventoryForm data={inventory} />;
};

export default InventoryEdit;
