import NotFound from "@components/errors/not-found";
import useInventory from "@module/inventory/hooks/use-inventory";
import { Center, Loader } from "@mantine/core";

const InventoryDetail = () => {
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

  return (
    <div>
      InventoryDetail
      <pre>{JSON.stringify(inventory, null, 2)}</pre>
    </div>
  );
};

export default InventoryDetail;
