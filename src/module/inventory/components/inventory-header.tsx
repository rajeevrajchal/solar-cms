import SearchInput from "@components/search-input";
import UploadCSV from "@components/upload-csv";
import useInventoryMutate from "@hook/data/inventory/use-inventory-mutate";
import { Button, Flex, Select } from "@mantine/core";
import AppRoute from "@routes/route.constant";
import { IoMdAdd } from "react-icons/io";
import { IoCloudDownloadOutline } from "react-icons/io5";
import { useSearchParams } from "react-router-dom";

const InventoryHeader = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { prase_csv, download_csv } = useInventoryMutate();

  const handleStatusFilter = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams);

    if (value === "" || value === null) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    setSearchParams(params);
  };

  return (
    <Flex align="center" gap="md" wrap="wrap">
      <SearchInput />
      <Select
        searchable
        placeholder="Choose Vendor"
        data={[]}
        clearable
        value={searchParams.get("vendor") || ""}
        onChange={(value: string | null) => handleStatusFilter("vendor", value)}
        style={{
          textTransform: "capitalize",
        }}
      />
      <Select
        searchable
        placeholder="Choose Type"
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
        clearable
        value={searchParams.get("category") || ""}
        onChange={(value: string | null) =>
          handleStatusFilter("category", value)
        }
        style={{
          textTransform: "capitalize",
        }}
      />
      <Button
        leftSection={<IoMdAdd size={14} />}
        variant="light"
        component="a"
        href={AppRoute.create_inventory}
      >
        Add Inventory
      </Button>
      <Button
        leftSection={<IoCloudDownloadOutline size={14} />}
        variant="light"
        loading={download_csv.isPending}
        disabled={download_csv.isPending}
        onClick={() => download_csv.mutate()}
      >
        Download CSV
      </Button>
      <UploadCSV
        loading={prase_csv.isPending}
        onSubmit={(value) => {
          console.log("the values", value);
          prase_csv.mutate({
            file: value,
          });
        }}
      />
    </Flex>
  );
};

export default InventoryHeader;
