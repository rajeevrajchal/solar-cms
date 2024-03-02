import SearchInput from "@components/search-input";
import { ORDER_STATUS, ORDER_STATUS_NAME } from "@enum/order-status.enum";
import { Flex, Select } from "@mantine/core";
import { useSearchParams } from "react-router-dom";

const OrderHeader = () => {
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
        placeholder="Select Status"
        data={[
          {
            label: ORDER_STATUS_NAME[ORDER_STATUS.ORDERED],
            value: ORDER_STATUS.ORDERED,
          },
          {
            label: ORDER_STATUS_NAME[ORDER_STATUS.CANALED],
            value: ORDER_STATUS.CANALED,
          },
        ]}
        clearable
        value={searchParams.get("status") || ""}
        onChange={(value: string | null) => handleStatusFilter("status", value)}
        style={{
          textTransform: "capitalize",
        }}
      />
    </Flex>
  );
};

export default OrderHeader;
