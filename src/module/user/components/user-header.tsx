import SearchInput from "@components/search-input";
import { USER_ROLE } from "@enum/user.role";
import { Flex, Button, Select } from "@mantine/core";
import AppRoute from "@routes/route.constant";
import { IoMdAdd } from "react-icons/io";
import { useSearchParams } from "react-router-dom";

const UserTableHeader = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleRoleFilter = (value: string | null) => {
    const params = new URLSearchParams(searchParams);
    if (value === "" || value === null) {
      params.delete("status");
    } else {
      params.set("status", value);
    }
    setSearchParams(params);
  };

  return (
    <Flex align="center" gap="md">
      <SearchInput />

      <Select
        searchable
        placeholder="Choose Role"
        data={[
          {
            label: "Sale",
            value: USER_ROLE.SALE,
          },
          {
            label: "Engineer",
            value: USER_ROLE.ENGINEER,
          },
          {
            label: "Site Engineer",
            value: USER_ROLE.WORKER,
          },
        ]}
        clearable
        value={searchParams.get("status") || ""}
        onChange={(value: string | null) => handleRoleFilter(value)}
        style={{
          textTransform: "capitalize",
        }}
      />

      <Button
        leftSection={<IoMdAdd size={14} />}
        variant="light"
        component="a"
        href={AppRoute.create_user}
      >
        Create User
      </Button>
    </Flex>
  );
};

export default UserTableHeader;
