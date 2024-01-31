import SearchInput from "@components/search-input";
import { Button, Flex } from "@mantine/core";
import { IoMdAdd } from "react-icons/io";
import { useSearchParams } from "react-router-dom";

const VendorHeader = () => {
  const [, setSearchParams] = useSearchParams();

  return (
    <Flex align="center" gap="md">
      <SearchInput />
      <Button
        leftSection={<IoMdAdd size={14} />}
        variant="light"
        onClick={() =>
          setSearchParams({
            type: "create",
          })
        }
      >
        Add Vendor
      </Button>
    </Flex>
  );
};

export default VendorHeader;
