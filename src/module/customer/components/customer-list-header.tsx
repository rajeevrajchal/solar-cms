import { Flex, TextInput, CloseButton, Button } from "@mantine/core";
import AppRoute from "@routes/route.constant";
import { CiSearch } from "react-icons/ci";
import { IoMdAdd } from "react-icons/io";
import { useSearchParams } from "react-router-dom";

const CustomerListHeader = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearch = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value === "" || value === null) {
      params.delete("query");
    } else {
      params.set("query", value);
    }
    setSearchParams(params);
  };

  return (
    <Flex align="center" gap="md">
      <TextInput
        leftSection={<CiSearch />}
        placeholder="Search"
        rightSection={
          searchParams.get("query") ? (
            <CloseButton onClick={() => handleSearch("")} />
          ) : (
            ""
          )
        }
        value={searchParams.get("query") || ""}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <Button
        leftSection={<IoMdAdd size={20} />}
        variant="outline"
        component="a"
        href={AppRoute.create_customer}
      >
        Add Customer
      </Button>
    </Flex>
  );
};

export default CustomerListHeader;
