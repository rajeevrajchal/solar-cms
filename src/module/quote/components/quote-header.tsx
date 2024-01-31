import SearchInput from "@components/search-input";
import { Button, Flex, Select } from "@mantine/core";
import AppRoute from "@routes/route.constant";
import { IoMdAdd } from "react-icons/io";
import { useSearchParams } from "react-router-dom";

const QuoteHeader = () => {
  const [searchParams, setSearchParams] = useSearchParams();

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
    <Flex align="center" gap="md">
      <SearchInput />
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
        value={searchParams.get("status") || ""}
        onChange={(value: string | null) => handleStatusFilter("status", value)}
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
        Create Quote
      </Button>
    </Flex>
  );
};

export default QuoteHeader;
