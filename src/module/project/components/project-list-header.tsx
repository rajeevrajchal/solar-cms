import { Button, CloseButton, Flex, Select, TextInput } from "@mantine/core";
import { map } from "lodash";
import { IoMdAdd } from "react-icons/io";
import { CiSearch } from "react-icons/ci";

import { STATUS_NAME } from "@enum/status.enum";
import AppRoute from "@routes/route.constant";
import { useSearchParams } from "react-router-dom";

const ProjectListHeader = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleStatusFilter = (value: string | null) => {
    const params = new URLSearchParams(searchParams);
    if (value === "" || value === null) {
      params.delete("status");
    } else {
      params.set("status", value);
    }
    setSearchParams(params);
  };

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
      <Select
        searchable
        placeholder="Pick status"
        data={map(STATUS_NAME, (v, k) => {
          return {
            label: v,
            value: k,
          };
        })}
        clearable
        value={searchParams.get("status") || ""}
        onChange={(value: string | null) => handleStatusFilter(value)}
        style={{
          textTransform: "capitalize",
        }}
      />
      <Button
        leftSection={<IoMdAdd size={14} />}
        variant="light"
        component="a"
        href={AppRoute.create_project}
      >
        Create
      </Button>
    </Flex>
  );
};

export default ProjectListHeader;
